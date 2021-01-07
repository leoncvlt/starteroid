import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heading, Stack, Text, Link, VStack } from "@chakra-ui/react";

import { SignIn } from "../../components/authentication/SignIn";

export const SignInPage = ({ location }) => {
  return (
    <Stack>
      <Heading as="h3" size="lg">
        Log-in to your account
      </Heading>
      <SignIn location={location} />
      <VStack>
        <Link as={RouterLink} to="/recover-password" color="blue.500">
          Forgot your password?
        </Link>
        <Text>
          Don't have an account?
          <Link as={RouterLink} to="/register" color="blue.500">
            {" "}
            Click here to register
          </Link>
        </Text>
      </VStack>
    </Stack>
  );
};
