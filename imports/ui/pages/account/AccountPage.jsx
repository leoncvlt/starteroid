import React from "react";
import { Heading, Stack, Button, VStack, Avatar } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { ChangePassword } from "../../components/authentication/ChangePassword";
import { deleteUserSelf } from "../../../api/users/methods";

export const AccountPage = () => {
  const history = useHistory();

  const handleRemoveAccount = () => {
    const prompt = `Are you sure you want to delete your account and all data associated to it? This action cannot be undone.`;
    if (confirm(prompt)) {
      deleteUserSelf.callPromise().then(() => history.push("/"));
    }
  };

  return (
    <Stack>
      <VStack>
        <Heading as="h3" size="lg">
          Your Account
        </Heading>
        <Avatar size="2xl" />
      </VStack>

      <Stack>
        <Heading as="h4" size="md">
          Change Password
        </Heading>
        <ChangePassword />
      </Stack>

      <Stack>
        <Heading as="h4" size="md" color="tomato">
          Danger Zone
        </Heading>
        <Button colorScheme="red" onClick={handleRemoveAccount}>
          Delete Account
        </Button>
      </Stack>
    </Stack>
  );
};
