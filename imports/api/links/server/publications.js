import { Meteor } from "meteor/meteor";
import { Links } from "../links";

Meteor.publish("links.public", function publishPublicLinks() {
  return Links.find({ owner: null });
});

Meteor.publish("links.user", function publishLinksForUser(ownerId) {
  return Links.find({ owner: ownerId });
});
