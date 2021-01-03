export const createCheckoutSession = new ValidatedMethod({
  name: "stripe.checkout.session.create",
  mixins: [CallPromiseMixin, LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  async run({ successUrl, cancelUrl }) {
    try {
      if (!this.isSimulation) {
        import { createServerCheckoutSession } from "./server/sessions";
        const currentUser = Meteor.users.findOne(this.userId);
        const email = currentUser.emails[0].address;
        const customerId = currentUser.customer?.id;
        const session = await createServerCheckoutSession({
          email,
          customerId,
          successUrl,
          cancelUrl,
        });
        return session;
      }
    } catch (exception) {
      console.log(exception);
      throw new Meteor.Error("500", exception);
    }
  },
});

export const createPortalSession = new ValidatedMethod({
  name: "stripe.portal.session.create",
  mixins: [CallPromiseMixin, LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  async run({ returnUrl }) {
    try {
      if (!this.isSimulation) {
        import { createServerPortalSession } from "./server/sessions";
        const currentUser = Meteor.users.findOne(this.userId);
        const customerId = currentUser.customer?.id;
        const session = await createServerPortalSession({ customerId, returnUrl });
        return session;
      }
    } catch (exception) {
      console.log(exception);
      throw new Meteor.Error("500", exception);
    }
  },
});