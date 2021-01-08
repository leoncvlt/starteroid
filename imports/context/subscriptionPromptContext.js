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
import { openCheckoutOrPortalForm } from "../modules/stripe";

export const SubscriptionPromptContext = React.createContext();

export const SubscriptionPromptProvider = ({ children }) => {
  const [promptText, setPromptText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isSubscribed } = useAccount({ customer: 1 });

  const cancelRef = React.useRef();

  const handleStripeRedirect = () => {
    const location = window.location.href;
    openCheckoutOrPortalForm(user, location, location);
  };

  return (
    <SubscriptionPromptContext.Provider
      value={{ onOpen, setPromptText, isSubscribed, handleStripeRedirect }}
    >
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
              <Button colorScheme="blue" ml={3} onClick={handleStripeRedirect}>
                Update now
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </SubscriptionPromptContext.Provider>
  );
};
