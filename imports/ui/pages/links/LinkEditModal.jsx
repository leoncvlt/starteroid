import React, { useState, useEffect } from "react";
import {
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useValidation } from "../../../hooks/useValidation";
import { LinksSchema } from "../../../api/links/schema";
import { getLink } from "../../../api/links/methods";

export const LinkEditModal = ({ isOpen, currentLinkId, onClose, onCreate, onUpdate }) => {
  const defaultState = {
    title: "",
    url: "",
  };
  const [linkData, setLinkData] = useState(defaultState);
  const { validate, hasError, errorText } = useValidation(LinksSchema);

  useEffect(() => {
    if (currentLinkId) {
      getLink.callPromise(currentLinkId).then((data) => setLinkData(data));
    } else {
      setLinkData(defaultState);
    }
  }, [currentLinkId]);

  const handleChange = (event) => {
    const changedValue = { [event.target.name]: event.target.value };
    setLinkData((prevState) => ({ ...prevState, ...changedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const [valid, validatedLinkData] = validate(linkData);
    console.log(linkData, valid, validatedLinkData);

    if (!valid) return;

    if (validatedLinkData._id) {
      onUpdate(validatedLinkData);
    } else {
      onCreate(validatedLinkData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{linkData._id ? "Edit" : "Create"} Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl isInvalid={hasError("title")}>
              <FormLabel>{LinksSchema.label("title")}</FormLabel>
              <Input name="title" value={linkData.title} type="text" onChange={handleChange} />
              <FormErrorMessage>{errorText("title")}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={hasError("url")}>
              <FormLabel>{LinksSchema.label("url")}</FormLabel>
              <Input name="url" value={linkData.url} type="text" onChange={handleChange} />
              <FormErrorMessage>{errorText("url")}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
