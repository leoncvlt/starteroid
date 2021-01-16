import React from "react";

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
import { useHistory } from "react-router-dom";

const PurchasePrompt = ({ isOpen, onOpen, onClose, promptText }) => {
  const history = useHistory();
  const cancelRef = React.useRef();

  const handleSubscribe = () => {
    history.push("/plans", { from: window.location.href });
    onClose();
  };

  return (
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
  );
};

export default PurchasePrompt;
