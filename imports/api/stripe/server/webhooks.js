import Stripe from "stripe";
import { Meteor } from "meteor/meteor";
import {
  removeSubscription,
  updateCustomerData,
  updateSubscriptionData,
} from "../../users/methods";

const bound = Meteor.bindEnvironment((callback) => callback());

const stripe = Stripe(Meteor.settings.private.stripe);
const secret = Meteor.settings.private.webhook;

WebApp.connectHandlers.use("/api/stripe/webhooks", (req, res, next) => {
  if (req.method === "POST") {
    let event;
    let body = "";
    let signature = req.headers["stripe-signature"];
    req.on("data", (data) =>
      bound(() => {
        body += data;
      })
    );
    req.on("end", () =>
      bound(() => {
        try {
          event = stripe.webhooks.constructEvent(body, signature, secret);
        } catch (err) {
          console.warn("Webhook signature verification failed.");
          res.writeHead(400);
          res.end();
          return;
        }
        switch (event.type) {
          case "checkout.session.completed":
            // Payment is successful and the subscription is created.
            // You should provision the subscription.
            break;
          case "customer.created":
            let { id, email } = event.data.object;
            updateCustomerData.callPromise({ email, customerId: id }).catch((error) => {
              console.warn(error);
              res.writeHead(400);
              res.end(error);
            });
            break;
          case "customer.subscription.updated":
            let { customer, status, current_period_end } = event.data.object;
            updateSubscriptionData
              .callPromise({ customerId: customer, status, current_period_end })
              .catch((error) => {
                console.warn(error);
                res.writeHead(400);
                res.end(error);
              });
            break;
          case "customer.subscription.deleted":
            removeSubscription
              .callPromise({ customer: event.data.object.customer })
              .catch((error) => {
                console.warn(error);
                res.writeHead(400);
                res.end(error);
              });
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
        res.writeHead(200);
        res.end();
      })
    );
  } else {
    next();
  }
});
