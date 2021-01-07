import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heading, Stack, Text, Link, VStack } from "@chakra-ui/react";

import { SignUp } from "../../components/authentication/SignUp";

export const SignUpPage = () => {
  return (
    <Stack>
      <Heading as="h3" size="lg">
        Register your account
      </Heading>
      <SignUp />
      <VStack>
        <Text>
          Already have an account?{" "}
          <Link as={RouterLink} to="/sign-in">
            Click here to log in
          </Link>
        </Text>
        <Text>
          By registering you agree to our{" "}
          <Link as={RouterLink} to="/terms-and-conditions" color="blue.500" isExternal>
            terms & conditions
          </Link>{" "}
          and{" "}
          <Link as={RouterLink} to="/privacy-policy" color="blue.500" isExternal>
            privacy policy
          </Link>
        </Text>
      </VStack>
    </Stack>
  );
};
