import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Redirect } from "react-router";
import { Button, Alert, AlertIcon, useDisclosure, Stack, Tag } from "@chakra-ui/react";

import { LinkEditModal } from "./LinkEditModal";
import { LinksTable } from "./LinksTable";
import { LinksShare } from "./LinksShare";

import { Links } from "../../../api/links/links";
import { createLink, deleteLink, updateLink } from "../../../api/links/methods";

import { useSubscription } from "../../../hooks/useSubscription";

export const LinksPage = () => {
  const [currentLinkId, setCurrentLinkId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openSubscriptionPrompt, isSubscribed } = useSubscription();
  const { ownerId } = useParams();

  const { links, loggedIn, owned, viewable, loading } = useTracker(() => {
    const userSubscription = Meteor.subscribe("user.private", ownerId);
    const subscription = ownerId
      ? Meteor.subscribe("links.user", ownerId)
      : Meteor.subscribe("links.public");
    const owner = Meteor.users.findOne(ownerId);
    const currentUserId = Meteor.userId();

    const isPublic = ownerId == undefined;
    const isCurrentUserOwner = currentUserId === ownerId;
    const isOwnerPublic = !!owner && !owner.private;

    return {
      links: Links.find().fetch(),
      owned: currentUserId === ownerId,
      viewable: isPublic || isCurrentUserOwner || isOwnerPublic,
      loggedIn: !!currentUserId,
      loading: !userSubscription.ready() || !subscription.ready(),
    };
  }, [ownerId]);

  const handleLinkCreate = (linkData) => {
    if (!canAddLink()) {
      return;
    }
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

  const canAddLink = () => isSubscribed || links.length < 5;

  const handleDialogOpen = (linkId) => {
    if (!linkId && !canAddLink()) {
      openSubscriptionPrompt("You can only add up to 5 links with a free subscription.");
      return;
    }
    setCurrentLinkId(linkId);
    onOpen();
  };

  const handleDialogClose = () => {
    setCurrentLinkId(null);
    onClose();
  };

  return (
    <>
      {viewable ? (
        <Stack>
          <LinksTable
            links={links}
            loading={loading}
            editable={owned}
            onEdit={handleDialogOpen}
            onDelete={handleLinkDelete}
          />
          {owned && (
            <>
              <Button onClick={() => handleDialogOpen()}>
                Add new Link{" "}
                {!canAddLink() && (
                  <Tag ml={4} colorScheme="blue">
                    PRO
                  </Tag>
                )}
              </Button>
              <LinkEditModal
                currentLinkId={currentLinkId}
                isOpen={isOpen}
                onClose={handleDialogClose}
                onCreate={handleLinkCreate}
                onUpdate={handleLinkUpdate}
              />
              <br />
              <LinksShare />
            </>
          )}
          {!loggedIn && (
            <Alert status="info" rounded={4}>
              <AlertIcon />
              Sign In to create and share your own links.
            </Alert>
          )}
        </Stack>
      ) : (
        <>{!loading && <Redirect to={{ pathname: "/" }} />}</>
      )}
    </>
  );
};
