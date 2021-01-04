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
import { UnlockIcon } from "@chakra-ui/icons";

export const LinksShareSwitch = () => {
  const { user, isSubscribed } = useAccount({ private: 1 });
  const [disabled, setDisabled] = useState(false);

  const shareableLink = `${window.location.origin}/links/${user?._id}`;
  const { hasCopied, onCopy } = useClipboard(shareableLink);

  handleMakePrivate = (event) => {
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
          isDisabled={disabled || !isSubscribed}
        />
        {!isSubscribed && <Tag>PRO</Tag>}
      </FormControl>
    </Stack>
  );
};
