import React, { useContext, useEffect } from "react";
import { useMembership } from "../../../hooks/useMembership";
import { PageLoadingContext } from "../../../context/pageLoadingContext";

import { MembershipPlans } from "./MembershipPlans";

export const MembershipPage = ({ location }) => {
  const { isSubscribed, handleStartStripeSession } = useMembership();
  const { setPageLoading } = useContext(PageLoadingContext);

  // query the URL this page has been navigated to from the route path's location state
  // set it as the stripe portal's return URL
  const { from } = location && location.state ? location.state : { from: Meteor.absoluteUrl() };

  // show loading indicator until the subscription status of the user has been fetched
  useEffect(() => setPageLoading(isSubscribed === undefined), [isSubscribed]);

  if (isSubscribed) {
    // if the user is suscribed, redirect to stripe's customer management portal
    handleStartStripeSession({ returnUrl: from });
    return null;
  }

  const handlePurchase = (priceId) => {
    handleStartStripeSession({ priceId, successUrl: from, returnUrl: from });
  };

  // if not, render the membership plans options component
  return <MembershipPlans handlePurchase={handlePurchase} />;
};
