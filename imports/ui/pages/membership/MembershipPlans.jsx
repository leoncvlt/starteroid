import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

import {
  Box,
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
import { Plans } from "../../../api/stripe/plans/plans";
import { getPlans } from "../../../api/stripe/plans/methods";

export const MembershipPlans = ({ handlePurchase }) => {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getPlans
      .callPromise({ options: { sort: { price: 1 } } })
      .then((result) => setPlans(result))
      .catch((error) => console.warn(error))
      .finally(setLoading(false));
  }, []);
  // const { loading, plans } = useTracker(() => {
  //   const subscription = Meteor.subscribe("plans");
  //   return {
  //     loading: !subscription.ready(),
  //     plans: Plans.find({}, { sort: { price: 1 } }).fetch(),
  //   };
  // });

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
              <Button onClick={() => handlePurchase(plan._id)}>Purchase</Button>
            </Stat>
          ))}
        </HStack>
      </Skeleton>
    </VStack>
  );
};
