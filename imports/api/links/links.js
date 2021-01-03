import { Mongo } from "meteor/mongo";

export const Links = new Mongo.Collection("links");

Links.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Links.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
