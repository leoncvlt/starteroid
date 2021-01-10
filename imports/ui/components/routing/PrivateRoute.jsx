import React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";

export const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useAccount();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
