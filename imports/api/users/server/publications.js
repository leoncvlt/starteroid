Meteor.publish("user", function (fields) {
  if (this.userId) {
    return Meteor.users.find(this.userId, { fields });
  } else {
    return this.ready();
  }
});

Meteor.publish("user.private", function (userId) {
  return Meteor.users.find(userId, { fields: { private: 1 } });
});
