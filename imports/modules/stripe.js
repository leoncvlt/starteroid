import { Meteor } from "meteor/meteor";
import { createCheckoutSession, createPortalSession } from "../api/stripe/methods";

const loadStripe = () =>
  new Promise((resolve, reject) => {
    const existingScript = document.getElementById("stripejs");

    if (existingScript) {
      resolve(window.stripe);
    } else {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.id = "stripejs";
      if (Meteor.isCordova)
        document.addEventListener(
          "deviceready",
          () => {
            document.body.appendChild(script);
          },
          false
        );
      else document.body.appendChild(script);

      script.onload = () => {
        window.stripe = Stripe(Meteor.settings.public.stripe);
        resolve(window.stripe);
      };
    }
  });

export const openCheckoutForm = async ({ successUrl, cancelUrl }) => {
  const stripe = await loadStripe();
  const session = await createCheckoutSession.callPromise({ successUrl, cancelUrl });
  stripe.redirectToCheckout({ sessionId: session.sessionId });
};

export const openPortalForm = async ({ customerId, returnUrl }) => {
  const session = await createPortalSession.callPromise({ customerId, returnUrl });
  window.location.href = session.url;
};

export const openCheckoutOrPortalForm = (user, successUrl, cancelUrl) => {
  if (user.customer && user.customer.id && user.subscription) {
    openPortalForm({ returnUrl: cancelUrl });
  } else {
    openCheckoutForm({ successUrl, cancelUrl });
  }
};
