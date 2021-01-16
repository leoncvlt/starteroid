import React, { useState } from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useAccount } from "../hooks/useAccount";
import { startStripeSession } from "../modules/stripe";

import PurchasePrompt from "../ui/components/PurchasePrompt";

export const MembershipContext = React.createContext();

export const MembershipProvider = ({ children }) => {
  const toast = useToast();
  const { user } = useAccount({ customer: 1, subscription: 1 });

  const isSubscribed = user
    ? ["active", "trialing", "past_due"].some((s) => user.subscription?.status === s)
    : undefined;

  const handleStartStripeSession = async ({ priceId, successUrl, returnUrl }) => {
    startStripeSession({ user, priceId, successUrl, returnUrl }).catch((error) =>
      toast({
        title: "An error occurred.",
        description: error.reason,
        status: "error",
        isClosable: true,
      })
    );
  };

  const [promptText, setPromptText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <MembershipContext.Provider
      value={{ onOpen, setPromptText, isSubscribed, handleStartStripeSession }}
    >
      {children}
      {isSubscribed === false && (
        <PurchasePrompt onClose={onClose} isOpen={isOpen} promptText={promptText} />
      )}
    </MembershipContext.Provider>
  );
};
