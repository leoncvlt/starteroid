import { Meteor } from "meteor/meteor";
import { Links } from "../imports/api/links/links";
import { Plans } from "../imports/api/stripe/plans/plans";

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    import { createLink } from "../imports/api/links/methods";
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

  const shouldSyncPlans = Meteor.isDevelopment ? Plans.find().count() === 0 : true;
  if (shouldSyncPlans) {
    import { getPricesForProduct } from "../imports/api/stripe/server/methods";
    const productId = Meteor.settings.private.stripe.product;
    getPricesForProduct.callPromise({ productId }).then((result) => {
      for (const price of result.data) {
        if (price.active) {
          Plans.upsert(
            { _id: price.id },
            {
              type: price.type,
              currency: price.currency,
              interval: price.recurring?.interval,
              price: price.unit_amount,
            }
          );
        }
      }
    });
  }
});
