import Stripe from "stripe";
import { Meteor } from "meteor/meteor";

const stripe = Stripe(Meteor.settings.private.stripe);
const priceId = "price_1I5XVODhWDCrMiBydO1C7r5p";

export const createServerCheckoutSession = async ({ successUrl, cancelUrl, email, customerId }) => {
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
    // You may only specify one of these parameters: customer, customer_email.
    if (customerId) {
      params.customer = customerId;
    } else {
      params.customer_email = email;
    }
    const session = await stripe.checkout.sessions.create(params);

    return {
      sessionId: session.id,
    };
  } catch (exception) {
    throw new Meteor.Error("500", exception);
  }
};

export const createServerPortalSession = async ({ customerId, returnUrl }) => {
  try {
    const portalsession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      // This is the url to which the customer will be redirected when they are done
      // managign their billing with the portal.
      return_url: returnUrl,
    });

    return {
      url: portalsession.url,
    };
  } catch (exception) {
    throw new Meteor.Error("500", exception);
  }
};
