import React, { useState } from "react";

import { Modal, ModalContent, SlideFade, Spinner } from "@chakra-ui/react";

export const PageLoadingContext = React.createContext();

export const PageLoadingProvider = ({ children }) => {
  const [isPageLoading, setPageLoading] = useState(false);

  return (
    <PageLoadingContext.Provider value={{ isPageLoading, setPageLoading }}>
      <SlideFade in={!isPageLoading}>{children}</SlideFade>
      <Modal isOpen={isPageLoading} isCentered motionPreset="scale">
        <ModalContent bg="none" shadow="none" alignItems="center">
          <Spinner size="xl" />
        </ModalContent>
      </Modal>
    </PageLoadingContext.Provider>
  );
};
