import { useContext } from "react";
import { SubscriptionContext } from "../context/subscriptionContext";

export const useSubscription = () => {
  const { onOpen, setPromptText, isSubscribed, handleStartStripeSession } = useContext(
    SubscriptionContext
  );
  const openSubscriptionPrompt = (promptText) => {
    setPromptText(promptText);
    onOpen();
  };
  return { openSubscriptionPrompt, handleStartStripeSession, isSubscribed };
};
