import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar.jsx";
import { CookiesConsent } from "../components/CookiesConsent.jsx";
import { PublicRoute } from "../components/routing/PublicRoute.jsx";
import { PrivateRoute } from "../components/routing/PrivateRoute.jsx";
import { SignOut } from "../components/authentication/SignOut.jsx";

import { LinksPage } from "../pages/links/LinksPage.jsx";
import { AccountPage } from "../pages/account/AccountPage.jsx";
import { MembershipPage } from "../pages/membership/MembershipPage.jsx";
import { SignInPage } from "../pages/authentication/SignInPage.jsx";
import { SignUpPage } from "../pages/authentication/SignUpPage.jsx";
import { ForgotPasswordPage } from "../pages/authentication/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "../pages/authentication/ResetPasswordPage.jsx";
import { NotFoundPage } from "../pages/not-found/NotFoundPage.jsx";
import { PrivacyPolicyPage } from "../pages/privacy-policy/PrivacyPolicyPage.jsx";
import { TermsAndConditionsPage } from "../pages/terms-and-conditions/TermsAndConditionsPage.jsx";

import { MembershipProvider } from "../../context/MembershipContext.js";
import { PageLoadingProvider } from "../../context/pageLoadingContext.js";

import { useAccount } from "../../hooks/useAccount.js";

export const App = () => {
  const { userId } = useAccount();
  return (
    <Router>
      <ChakraProvider>
        <CookiesConsent />
        <MembershipProvider>
          <Navbar />
          <Container maxW="xl" mb={16}>
            <PageLoadingProvider>
              <Switch>
                <PublicRoute exact path="/sign-in">
                  <SignInPage />
                </PublicRoute>
                <PublicRoute exact path="/register">
                  <SignUpPage />
                </PublicRoute>
                <PrivateRoute exact path="/sign-out">
                  <SignOut />
                </PrivateRoute>
                <Route exact path="/recover-password">
                  <ForgotPasswordPage />
                </Route>
                <Route name="reset-password" path="/reset-password/:token">
                  <ResetPasswordPage />
                </Route>

                <PrivateRoute exact path="/account">
                  <AccountPage />
                </PrivateRoute>
                <PrivateRoute exact path="/membership">
                  <MembershipPage />
                </PrivateRoute>

                <PublicRoute exact path="/" redirect={`/links/${userId}`}>
                  <LinksPage />
                </PublicRoute>
                <Route exact path="/links/:ownerId">
                  <LinksPage />
                </Route>

                <Route exact path="/privacy-policy">
                  <PrivacyPolicyPage
                    websiteName="Starteroid"
                    websiteUrl="starteroid.com"
                    companyName="Starteroid"
                  />
                </Route>
                <Route exact path="/terms-and-conditions">
                  <TermsAndConditionsPage
                    websiteName="Starteroid"
                    websiteUrl="starteroid.com"
                    companyName="Starteroid"
                  />
                </Route>

                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </PageLoadingProvider>
          </Container>
        </MembershipProvider>
      </ChakraProvider>
    </Router>
  );
};
