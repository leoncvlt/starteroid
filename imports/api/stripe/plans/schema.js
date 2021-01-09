import SimpleSchema from "simpl-schema";

export default PlanSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "Unique identifier for the price on both Stripe and the application database.",
  },
  type: {
    type: String,
    label: "Whether the price is for a one-time purchase or a recurring (subscription) purchase.",
    allowedValues: ["one_time", "recurring"],
  },
  currency: {
    type: String,
    label: "Three-letter ISO currency code, in lowercase.",
  },
  interval: {
    type: String,
    label: "The frequency at which a subscription is billed.",
    allowedValues: ["day", "week", "month", "year"],
  },
  price: {
    type: Number,
    label: "Price of the plan in cents.",
  },
});
