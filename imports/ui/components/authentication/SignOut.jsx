import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const SignOut = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    Meteor.logout(() => setLoggedOut(true));
  });

  if (loggedOut) {
    return <Redirect to={"/"} />;
  }

  return null;
};
