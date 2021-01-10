import { Meteor } from "meteor/meteor";
import { Links } from "../../api/links/links";
import { Plans } from "../../api/stripe/plans/plans";

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    import { createLink } from "../../api/links/methods";
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

  // on development mode, fetch the plans from stripe if the plan collection is empty
  // on production mode, fetch them each time on application start
  const shouldSyncPlans = Meteor.isDevelopment ? Plans.find().count() === 0 : true;
  if (shouldSyncPlans) {
    import { getPricesForProduct } from "../imports/api/stripe/server/methods";
    const productId = Meteor.settings.private.stripe.product;
    getPricesForProduct.callPromise({ productId }).then((result) => {
      for (const price of result.data) {
        if (price.active) {
          Plans.upsert(
            // use the price ID as database ID to being able to upsert any changes
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
