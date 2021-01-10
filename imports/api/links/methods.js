import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import { Links } from "./links";
import { LinksSchema } from "./schema";

export const createLink = new ValidatedMethod({
  name: "links.create",
  mixins: [CallPromiseMixin],
  validate: LinksSchema.validator({ clean: true }),
  run(link) {
    return Links.insert({ ...link, owner: this.userId });
  },
});

export const updateLink = new ValidatedMethod({
  name: "links.update",
  mixins: [CallPromiseMixin],
  validate: LinksSchema.validator({ clean: true }),
  run(link) {
    return Links.update(link._id, link);
  },
});

export const deleteLink = new ValidatedMethod({
  name: "links.delete.one",
  mixins: [CallPromiseMixin],
  validate: (id) => check(id, String),
  run(id) {
    return Links.remove({ _id: id });
  },
});

export const deleteAllLinksForUser = new ValidatedMethod({
  name: "links.delete.all.user",
  mixins: [CallPromiseMixin],
  validate: (userId) => check(userId, String),
  run(userId) {
    return Links.remove({ owner: userId });
  },
});
