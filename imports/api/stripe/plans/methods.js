import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import { Plans } from "./plans";

export const getPlans = new ValidatedMethod({
  name: "stripe.plans.get",
  mixins: [CallPromiseMixin],
  validate: null,
  run({ query = {}, options = {} } = {}) {
    return Plans.find(query, options).fetch();
  },
});
