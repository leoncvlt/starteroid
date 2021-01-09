import { useTracker } from "meteor/react-meteor-data";
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
import { Links } from "../../../api/links/links";

export const LinkEditModal = ({ isOpen, currentLinkId, onClose, onCreate, onUpdate }) => {
  const defaultState = {
    title: "",
    url: "",
  };
  const [linkData, setLinkData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const { validate, hasError, errorText, clearErrors } = useValidation(LinksSchema);

  useTracker(() => {
    clearErrors();
    if (currentLinkId) {
      const subscription = Meteor.subscribe("links.one", currentLinkId);
      const link = Links.findOne({ _id: currentLinkId });
      setLoading(!subscription.ready());
      setLinkData(link);
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

    if (!valid) return;

    clearErrors();
    setLoading(true);
    const callback = validatedLinkData._id ? onUpdate : onCreate;
    callback(validatedLinkData)
      .then((result) => onClose())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
          <Button colorScheme="blue" isLoading={loading} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
