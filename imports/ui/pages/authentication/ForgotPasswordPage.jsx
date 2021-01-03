import React from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { ForgotPassword } from "../../components/authentication/ForgotPassword";

export const ForgotPasswordPage = () => {
  return (
    <Stack>
      <Heading as="h3" size="lg">
        Forgot your password?
      </Heading>
      <Text>Enter your email address below to receive a link to reset your password.</Text>
      <ForgotPassword />
    </Stack>
  );
};
