import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, Heading, Box, Stack, Container } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar.jsx";
import { LinksPage } from "../pages/links/LinksPage.jsx";
import { NotFoundPage } from "../pages/not-found/NotFoundPage.jsx";
import { PublicRoute } from "../components/routing/PublicRoute.jsx";
import { PrivateRoute } from "../components/routing/PrivateRoute.jsx";
import { SignOut } from "../components/authentication/SignOut.jsx";
import { SignInPage } from "../pages/authentication/SignInPage.jsx";
import { SignUpPage } from "../pages/authentication/SignUpPage.jsx";
import { ForgotPasswordPage } from "../pages/authentication/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "../pages/authentication/ResetPasswordPage.jsx";
import { useAccount } from "../../hooks/useAccount.js";
import { AccountPage } from "../pages/account/AccountPage.jsx";
import { SubscriptionPromptProvider } from "../../context/subscriptionPromptContext.js";

export const App = () => {
  const { userId } = useAccount();
  return (
    <Router>
      <ChakraProvider>
        <SubscriptionPromptProvider>
          <Navbar />
          <Container maxW="xl">
            <Switch>
              <PublicRoute exact path="/sign-in" component={SignInPage} />
              <PublicRoute exact path="/register" component={SignUpPage} />
              <Route exact path="/recover-password" component={ForgotPasswordPage} />
              <Route
                name="reset-password"
                path="/reset-password/:token"
                component={ResetPasswordPage}
              />
              <PrivateRoute exact path="/sign-out" component={SignOut} />
              <PrivateRoute exact path="/account" component={AccountPage} />

              <PublicRoute exact path="/" redirect={`/links/${userId}`} component={LinksPage} />
              <Route exact path="/links/:ownerId" component={LinksPage} />

              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Container>
        </SubscriptionPromptProvider>
      </ChakraProvider>
    </Router>
  );
};
