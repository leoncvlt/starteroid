import { Meteor } from "meteor/meteor";
import { Links } from "../imports/api/links/links";
import { createLink } from "../imports/api/links/methods";

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    createLink.call({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    createLink.call({
      title: "Follow the Guide",
      url: "http://guide.meteor.com",
    });

    createLink.call({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    createLink.call({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }
});
