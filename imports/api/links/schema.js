import SimpleSchema from "simpl-schema";

export const LinksSchema = new SimpleSchema({
  _id: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  owner: {
    type: String,
    optional: true,
  },
  title: {
    type: String,
    label: "Title",
  },
  url: {
    type: String,
    label: "URL",
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    },
  },
});
