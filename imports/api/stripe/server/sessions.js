import { Meteor } from "meteor/meteor";
import Stripe from "./stripe";

export const createCheckoutSession = async ({
  priceId,
  successUrl,
  cancelUrl,
  customerEmail,
  customerId,
}) => {
  try {
    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: successUrl + "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancelUrl,
    };
    // stripe lets you only specify one of these parameters: customer, customer_email.
    // if we have an existing customer id, we can pass it to re-use it and avoid creating
    // a new customer - alternatively, pass the current user email topre-populate the email
    // field and make sure the purchase is associated to the current user.
    if (customerId) {
      params.customer = customerId;
    } else {
      params.customer_email = customerEmail;
    }
    const session = await Stripe.checkout.sessions.create(params);

    return {
      sessionId: session.id,
    };
  } catch (exception) {
    throw new Meteor.Error("500", `[stripe.createServerCheckoutSession] ${exception}`);
  }
};

export const createPortalSession = async ({ customerId, returnUrl }) => {
  try {
    const portalsession = await Stripe.billingPortal.sessions.create({
      customer: customerId,
      // This is the url to which the customer will be redirected when they are done
      // managign their billing with the portal.
      return_url: returnUrl,
    });

    return {
      url: portalsession.url,
    };
  } catch (exception) {
    throw new Meteor.Error("500", `[stripe.createServerPortalSession] ${exception}`);
  }
};
