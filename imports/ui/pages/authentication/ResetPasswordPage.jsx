import React from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import ResetPassword from "../../components/authentication/ResetPassword";

export const ResetPasswordPage = () => {
  return (
    <Stack>
      <Heading as="h3" size="lg">
        Reset your password
      </Heading>
      <ResetPassword />
    </Stack>
  );
};
