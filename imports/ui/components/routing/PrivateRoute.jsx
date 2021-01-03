import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";

export const PrivateRoute = (props) => {
  const { isLoggedIn } = useAccount();
  const { component, children, location, title, redirect, ...rest } = props;
  return isLoggedIn ? (
    <Route component={component} {...rest}>
      {children}
    </Route>
  ) : (
    <Redirect
      to={{
        pathname: redirect || "/sign-in",
        state: { from: location },
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  //TODO: Add location proptype/default
};
