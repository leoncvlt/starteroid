import React, { useMemo, useState, useEffect } from "react";

import {
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAccount } from "../hooks/useAccount";
import { openStripeForm } from "../modules/stripe";

export const SubscriptionPromptContext = React.createContext();

export const SubscriptionPromptProvider = ({ children }) => {
  const [promptText, setPromptText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { user, isSubscribed } = useAccount({ customer: 1 });

  const url = window.location.href;

  return (
    <SubscriptionPromptContext.Provider value={{ onOpen, setPromptText, isSubscribed }}>
      {children}
      {!isSubscribed && (
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader></AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {promptText && <Text>{promptText}</Text>}
              <Text>Update your subscription now to use all features.</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Maybe later
              </Button>
              <Button colorScheme="blue" ml={3} onClick={() => openStripeForm(user, url, url)}>
                Update now
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </SubscriptionPromptContext.Provider>
  );
};
