import React, { useContext } from "react";
import { SubscriptionPromptContext } from "../context/subscriptionPromptContext";

export const useSubscription = () => {
  const { onOpen, setPromptText } = useContext(SubscriptionPromptContext);
  const openSubscriptionPrompt = (promptText) => {
    setPromptText(promptText);
    onOpen();
  };
  return { openSubscriptionPrompt };
};