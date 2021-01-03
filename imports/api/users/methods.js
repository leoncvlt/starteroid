import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import { deleteAllLinksForUser } from "../links/methods";

export const makeLinksPrivate = new ValidatedMethod({
  name: "users.set.private",
  mixins: [CallPromiseMixin, LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  run() {
    return Meteor.users.update(this.userId, { $set: { private: true } });
  },
});

export const makeLinksPublic = new ValidatedMethod({
  name: "users.unset.private",
  mixins: [CallPromiseMixin, LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  run() {
    return Meteor.users.update(this.userId, { $unset: { private: true } });
  },
});

export const deleteUserSelf = new ValidatedMethod({
  name: "users.delete.self",
  mixins: [CallPromiseMixin, LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  async run() {
    await deleteAllLinksForUser.callPromise({ userId: this.userId });
    return Meteor.users.remove(this.userId);
  },
});

export const updateCustomerData = new ValidatedMethod({
  name: "users.update.customer",
  mixins: [CallPromiseMixin],
  validate: null,
  async run({ email, customerId }) {
    import { Accounts } from "meteor/accounts-base";
    const user = Accounts.findUserByEmail(email);
    if (!user) {
      throw new Meteor.Error("500", `User with email ${email} not found`);
    }
    const customer = { id: customerId };
    return Meteor.users.update(user._id, { $set: { customer } });
  },
});

export const updateSubscriptionData = new ValidatedMethod({
  name: "users.update.subscription",
  mixins: [CallPromiseMixin],
  validate: null,
  async run({ customerId, status, currentPeriodEnd }) {
    const user = Meteor.users.findOne({ "customer.id": customerId });
    if (!user) {
      throw new Meteor.Error("500", `User with customerId ${customerId} not found`);
    }
    const subscription = { status, currentPeriodEnd };
    return Meteor.users.update(user._id, { $set: { subscription } });
  },
});

export const removeSubscription = new ValidatedMethod({
  name: "users.delete.subscription",
  mixins: [CallPromiseMixin],
  validate: null,
  async run({ customerId }) {
    const user = Meteor.users.findOne({ "customer.id": customerId });
    if (!user) {
      throw new Meteor.Error("500", `User with customerId ${customerId} not found`);
    }
    return Meteor.users.update(user._id, { $unset: { subscription: true } });
  },
});
