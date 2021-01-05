import React, { useState } from "react";
import {
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useClipboard,
  Center,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { useAccount } from "../../../hooks/useAccount";
import { makeLinksPrivate, makeLinksPublic } from "../../../api/users/methods";
import { useSubscription } from "../../../hooks/useSubscription";

export const LinksShare = () => {
  const { user } = useAccount({ private: 1 });
  const [disabled, setDisabled] = useState(false);
  const { openSubscriptionPrompt, isSubscribed } = useSubscription();

  const shareableLink = `${window.location.origin}/links/${user?._id}`;
  const { hasCopied, onCopy } = useClipboard(shareableLink);

  handleMakePrivate = (event) => {
    if (!isSubscribed) {
      openSubscriptionPrompt("Members with a PRO subscription can set their link list to private.");
      return;
    }
    setDisabled(true);
    const value = event.target.checked;
    const method = value ? makeLinksPrivate : makeLinksPublic;
    method.callPromise().then(() => setDisabled(false));
  };

  return (
    <Stack>
      <InputGroup>
        <InputLeftAddon children="Shareable Link" />
        <Input
          type="text"
          isDisabled={user?.private}
          isReadOnly
          value={user?.private ? "-" : shareableLink}
        />
        <Button onClick={onCopy} isDisabled={user?.private} ml={1}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </InputGroup>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Make Private
        </FormLabel>
        <Switch
          id="email-alerts"
          isChecked={user?.private || false}
          onChange={handleMakePrivate}
          isDisabled={disabled}
        />
        {!isSubscribed && (
          <Tag ml={4} colorScheme="blue">
            PRO
          </Tag>
        )}
      </FormControl>
    </Stack>
  );
};
