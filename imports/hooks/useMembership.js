import { useContext } from "react";
import { MembershipContext } from "../context/MembershipContext";

export const useMembership = () => {
  const { onOpen, setPromptText, isSubscribed, handleStartStripeSession } = useContext(
    MembershipContext
  );
  const openPurchasePrompt = (promptText) => {
    setPromptText(promptText);
    onOpen();
  };
  return { openPurchasePrompt, handleStartStripeSession, isSubscribed };
};
