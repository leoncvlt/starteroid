import Stripe from "stripe";
import { Meteor } from "meteor/meteor";
import {
  removeSubscription,
  updateCustomerData,
  updateSubscriptionData,
} from "../../users/methods";

const bound = Meteor.bindEnvironment((callback) => callback());

const stripe = Stripe(Meteor.settings.private.stripe.key);
const secret = Meteor.settings.private.stripe.webhook_secret;

const failWebhook = (error, response, reason = "Stripe webhook execution failed") => {
  console.error(`[api.stripe.webhooks] ${reason}: ${error}`);
  response.writeHead(400);
  response.end(error);
};

const handleCustomerCreated = (event, response) => {
  const { email, id: customerId } = event.data.object;
  updateCustomerData
    .callPromise({ email, customerId })
    .catch((error) => failWebhook(error, response));
};

const handleCustomerSubscriptionUpdated = (event, response) => {
  const { status, current_period_end, id: customerId } = event.data.object;
  updateSubscriptionData
    .callPromise({ customerId, status, current_period_end })
    .catch((error) => failWebhook(error, response));
};

const handleCustomerSubscriptionDeleted = (event, response) => {
  const { customer } = event.data.object;
  removeSubscription.callPromise({ customer }).catch((error) => failWebhook(error, response));
};

WebApp.connectHandlers.use("/api/stripe/webhooks", (request, response, next) => {
  if (request.method === "POST") {
    let event;
    let body = "";
    let signature = request.headers["stripe-signature"];
    request.on("data", (data) => bound(() => (body += data)));
    request.on("end", () =>
      bound(() => {
        try {
          event = stripe.webhooks.constructEvent(body, signature, secret);
        } catch (error) {
          failWebhook(error, response, "Stripe webhook signature verification failed");
          return;
        }
        const data = event.data.object;
        switch (event.type) {
          case "checkout.session.completed":
            // Payment is successful and the subscription is created.
            // You should provision the subscription.
            break;
          case "customer.created":
            handleCustomerCreated(event, response);
            break;
          case "customer.subscription.updated":
            handleCustomerSubscriptionUpdated(event, response);
            break;
          case "customer.subscription.deleted":
            handleCustomerSubscriptionDeleted(event, response);
            break;
          case "invoice.paid":
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.
            break;
          case "invoice.payment_failed":
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            break;
          default:
          // Unhandled event type
        }
        response.writeHead(200);
        response.end();
      })
    );
  } else {
    next();
  }
});
