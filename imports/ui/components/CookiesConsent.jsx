import React, { useEffect, useRef } from "react";
import { Box, Button, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const CookiesConsent = () => {
  const toast = useToast();
  const toastRef = useRef();
  const [seen, setSeen] = useLocalStorage("cookieConsentSeen", false);

  const handleClose = () => {
    toast.close(toastRef.current);
    setSeen(true);
  };

  useEffect(() => {
    if (seen) {
      return;
    }
    toastRef.current = toast({
      duration: null,
      isClosable: false,
      render: () => (
        <Box p={4} shadow="lg" rounded="lg">
          <VStack>
            <Heading as="h3" size="md">
              We use cookies
            </Heading>
            <Text>
              We use cookies and other tracking technologies to improve your browsing experience on
              our website, to analyze our website traffic, and to understand where our visitors are
              coming from.
            </Text>
            <Button onClick={() => handleClose()}>I agree</Button>
          </VStack>
        </Box>
      ),
    });
  }, [seen]);

  return <></>;
};
