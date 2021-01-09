import { Meteor } from "meteor/meteor";

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
        window.stripe = Stripe(Meteor.settings.public.stripe.key);
        resolve(window.stripe);
      };
    }
  });

export const startStripeSession = ({ priceId, successUrl, returnUrl }) => {
  const host = Meteor.absoluteUrl();
  successUrl = successUrl || host;
  returnUrl = returnUrl || host;
  return new Promise((resolve, reject) => {
    Meteor.call(
      "stripe.session.create",
      { priceId, successUrl, returnUrl },
      async (error, session) => {
        if (error) {
          reject(error);
          return;
        }
        if (session.url) {
          window.location.href = session.url;
          resolve();
        } else {
          const stripe = await loadStripe();
          stripe.redirectToCheckout({ sessionId: session.sessionId });
          resolve();
        }
      }
    );
  });
};
