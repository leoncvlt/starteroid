import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import { Button, Box, Alert, AlertIcon, useDisclosure, Stack } from "@chakra-ui/react";
import { createLink, deleteLink, updateLink } from "../../../api/links/methods";
import { LinkEditModal } from "./LinkEditModal";
import { useParams } from "react-router-dom";
import { LinksTable } from "./LinksTable";
import { Links } from "../../../api/links/links";
import { LinksShareSwitch } from "./LinksShareSwitch";

export const LinksPage = () => {
  // const [links, setLinks] = useState([]);
  const [currentLinkId, setCurrentLinkId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ownerId } = useParams();

  // useEffect(() => {
  //   const query = ownerId ? { owner: ownerId } : { owner: null };
  //   getLinks.callPromise({ query }).then((result) => setLinks(result));
  // }, []);

  const { owned, viewable } = useTracker(() => {
    const handle = Meteor.subscribe("user.private", ownerId);
    const userId = Meteor.userId();
    const owner = Meteor.users.findOne(ownerId);
    return {
      owned: userId === ownerId,
      viewable: userId === ownerId || !owner?.private,
    };
  }, [ownerId]);

  const { links, loading } = useTracker(() => {
    const handle = ownerId
      ? Meteor.subscribe("links.user", ownerId)
      : Meteor.subscribe("links.public");
    return {
      links: Links.find().fetch(),
      loading: !handle.ready(),
    };
  }, [ownerId]);

  const handleLinkCreate = (linkData) => {
    createLink
      .callPromise(linkData)
      .then((result) => onClose())
      .catch((error) => console.log(error));
  };

  const handleLinkUpdate = (linkData) => {
    updateLink
      .callPromise(linkData)
      .then((result) => onClose())
      .catch((error) => console.log(error));
  };

  const handleLinkDelete = (linkId) => {
    if (confirm("Delete Link?")) {
      deleteLink.callPromise(linkId).catch((error) => console.log(error));
    }
  };

  const handleDialogOpen = (linkId) => {
    setCurrentLinkId(linkId);
    onOpen();
  };

  return (
    <>
      {viewable ? (
        <Stack>
          <LinksTable
            links={links}
            editable={owned}
            onEdit={handleDialogOpen}
            onDelete={handleLinkDelete}
          />
          {owned ? (
            <>
              <Button onClick={() => handleDialogOpen()}>Add new Link</Button>
              <LinkEditModal
                currentLinkId={currentLinkId}
                isOpen={isOpen}
                onClose={onClose}
                onCreate={handleLinkCreate}
                onUpdate={handleLinkUpdate}
              />
              <br />
              <LinksShareSwitch />
            </>
          ) : (
            <Alert status="info" rounded={4}>
              <AlertIcon />
              Sign In to create and share your own links.
            </Alert>
          )}
        </Stack>
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
};