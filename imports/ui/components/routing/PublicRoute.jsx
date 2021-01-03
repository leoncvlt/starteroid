import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";

export const PublicRoute = (props) => {
  const { isLoggedIn } = useAccount();
  const { component, children, location, redirect, ...rest } = props;
  return !isLoggedIn ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route component={component} {...rest}>
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

PublicRoute.propTypes = {
  component: PropTypes.func,
  //TODO: Add location proptype/default
};
