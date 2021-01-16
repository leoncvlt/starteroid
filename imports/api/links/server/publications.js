import { Meteor } from "meteor/meteor";
import { Links } from "../links";

Meteor.publish("links.public", function publishPublicLinks() {
  return Links.find({ owner: null });
});

Meteor.publish("links.private", function publishLinksForUser(ownerId) {
  return Links.find({ owner: ownerId });
});

Meteor.publish("links.one", function publishSingleLink(linksId) {
  return Links.find({ _id: linksId });
});
