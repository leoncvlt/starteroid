import React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";

export const PublicRoute = ({ component, children, location, redirect, ...props }) => {
  const { isLoggedIn } = useAccount();
  return !isLoggedIn ? (
    <Route component={component} {...props}>
      {children}
    </Route>
  ) : (
    <Redirect
      to={{
        pathname: redirect || "/",
        state: { from: location },
      }}
    />
  );
};
