import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar.jsx";
import { CookiesConsent } from "../components/CookiesConsent.jsx";
import { PublicRoute } from "../components/routing/PublicRoute.jsx";
import { PrivateRoute } from "../components/routing/PrivateRoute.jsx";

import { LinksPage } from "../pages/links/LinksPage.jsx";
import { AccountPage } from "../pages/account/AccountPage.jsx";
import { SignOut } from "../components/authentication/SignOut.jsx";
import { SignInPage } from "../pages/authentication/SignInPage.jsx";
import { SignUpPage } from "../pages/authentication/SignUpPage.jsx";
import { ForgotPasswordPage } from "../pages/authentication/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "../pages/authentication/ResetPasswordPage.jsx";
import { NotFoundPage } from "../pages/not-found/NotFoundPage.jsx";
import { PrivacyPolicyPage } from "../pages/privacy-policy/PrivacyPolicyPage.jsx";
import { TermsAndConditionsPage } from "../pages/terms-and-conditions/TermsAndConditionsPage.jsx";

import { SubscriptionPromptProvider } from "../../context/subscriptionPromptContext.js";

import { useAccount } from "../../hooks/useAccount.js";
import { PageLoadingProvider } from "../../context/pageLoadingContext.js";

export const App = () => {
  const { userId } = useAccount();
  return (
    <Router>
      <ChakraProvider>
        <CookiesConsent />
        <SubscriptionPromptProvider>
          <Navbar />
          <Container maxW="xl" mb={16}>
            <PageLoadingProvider>
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

                <Route exact path="/privacy-policy">
                  <PrivacyPolicyPage
                    websiteName="Astarteroid"
                    websiteUrl="astarteroid.com"
                    companyName="Astarteroid"
                  />
                </Route>
                <Route exact path="/terms-and-conditions">
                  <TermsAndConditionsPage
                    websiteName="Astarteroid"
                    websiteUrl="astarteroid.com"
                    companyName="Astarteroid"
                  />
                </Route>
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </PageLoadingProvider>
          </Container>
        </SubscriptionPromptProvider>
      </ChakraProvider>
    </Router>
  );
};
