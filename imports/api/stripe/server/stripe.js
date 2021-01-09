import Stripe from "stripe";

export default Stripe(Meteor.settings.private.stripe.key);
