import React from "react";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const SignOut = () => {
  Meteor.logout();
  return <Redirect to="/" />;
};
