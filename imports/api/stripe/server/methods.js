import Stripe from "./stripe";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";

new ValidatedMethod({
  name: "stripe.session.create",
  mixins: [LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  async run({ priceId, successUrl, returnUrl }) {
    if (!this.isSimulation) {
      let session;
      const user = Meteor.users.findOne(this.userId);
      if (!user.subscription) {
        // if the user doesn't have a subscription, open the checkout form
        import { createCheckoutSession } from "./sessions";
        const customerEmail = user.emails[0].address;

        // the user could still have a customer id from a previous subscription
        // if so, pass it to the checkout session so stripe reuses the same customer id
        const customerId = user.customer?.id;
        session = createCheckoutSession({
          customerEmail,
          customerId,
          priceId,
          successUrl,
          cancelUrl: returnUrl,
        });
      } else {
        // if the user has an ongoing subscription , open the customer management portal
        import { createPortalSession } from "./sessions";
        const customerId = user.customer.id;
        session = createPortalSession({ customerId, returnUrl });
      }
      return session;
    }
  },
});

export const getPricesForProduct = new ValidatedMethod({
  name: "stripe.product.prices.get",
  mixins: [CallPromiseMixin],
  validate: null,
  async run({ productId }) {
    if (!this.isSimulation) {
      const prices = await Stripe.prices.list({ product: productId });
      return prices;
    }
  },
});
