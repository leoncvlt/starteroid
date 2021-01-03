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
    Meteor.users.update(this.userId, { $set: { private: true } });
  },
});

export const makeLinksPublic = new ValidatedMethod({
  name: "users.unset.private",
  mixins: [CallPromiseMixin, LoggedInMixin],
  checkLoggedInError: { error: "notLogged" },
  validate: null,
  run() {
    Meteor.users.update(this.userId, { $unset: { private: true } });
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
