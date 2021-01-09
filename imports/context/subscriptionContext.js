import React, { useState } from "react";

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
  useToast,
} from "@chakra-ui/react";
import { useAccount } from "../hooks/useAccount";
import { useHistory } from "react-router-dom";
import { startStripeSession } from "../modules/stripe";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = ({ children }) => {
  const history = useHistory();
  const toast = useToast();
  const [promptText, setPromptText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAccount({ customer: 1, subscription: 1 });
  const isSubscribed = user
    ? ["active", "trialing", "past_due"].some((s) => user?.subscription?.status == s)
    : undefined;

  const cancelRef = React.useRef();

  const handleStartStripeSession = ({ priceId, successUrl, returnUrl }) => {
    startStripeSession({ user, priceId, successUrl, returnUrl }).catch((error) =>
      toast({
        title: "An error occurred.",
        description: error.reason,
        status: "error",
        isClosable: true,
      })
    );
  };

  const handleSubscribe = () => {
    history.push("/membership", { from: window.location.href });
    onClose();
  };

  return (
    <SubscriptionContext.Provider
      value={{ onOpen, setPromptText, isSubscribed, handleStartStripeSession }}
    >
      {children}
      {isSubscribed === false && (
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
              <Button colorScheme="blue" ml={3} onClick={handleSubscribe}>
                Update now
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </SubscriptionContext.Provider>
  );
};
