import { Mongo } from "meteor/mongo";

export const Plans = new Mongo.Collection("plans");

Plans.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Plans.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
