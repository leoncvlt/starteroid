import React, { useContext, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";

import {
  Box,
  Text,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  VStack,
  useColorModeValue,
  HStack,
  Skeleton,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useSubscription } from "../../../hooks/useSubscription";
import { PageLoadingContext } from "../../../context/pageLoadingContext";
import { Plans } from "../../../api/stripe/plans/plans";

export const PlansPage = ({ location }) => {
  const { isSubscribed, handleStartStripeSession } = useSubscription();
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

  const { loading, plans } = useTracker(() => {
    const subscription = Meteor.subscribe("plans");
    return {
      loading: !subscription.ready(),
      plans: Plans.find({}, { sort: { price: 1 } }).fetch(),
    };
  });

  const handlePlanPurchase = (priceId) => {
    handleStartStripeSession({ priceId, successUrl: from, returnUrl: from });
  };

  const bg = useColorModeValue("gray.50", "gray.700");
  return (
    <VStack>
      <Heading as="h3" size="lg" mb={4}>
        Update your membership
      </Heading>

      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <List>
          <ListItem>⚡ Add unlimited links</ListItem>
          <ListItem>🔒 Set your links list as private</ListItem>
          <ListItem>🥰 Support the developer's caffeine addition</ListItem>
        </List>
      </Box>

      <Skeleton isLoaded={!loading}>
        <HStack mt={4}>
          {plans.map((plan) => (
            <Stat key={plan._id} bg={bg} shadow="lg" rounded="lg" p={4} flex textAlign="center">
              <StatLabel></StatLabel>
              <StatNumber>${plan.price / 100}</StatNumber>
              <StatHelpText>per {plan.interval}</StatHelpText>
              <Button onClick={() => handlePlanPurchase(plan._id)}>Purchase</Button>
            </Stat>
          ))}
        </HStack>
      </Skeleton>
    </VStack>
  );
};
