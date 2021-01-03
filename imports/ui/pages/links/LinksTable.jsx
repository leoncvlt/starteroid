import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link, HStack, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export const LinksTable = ({ links, editable, onEdit, onDelete }) => {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>URL</Th>
          {editable && <Th>Actions</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {links && links.map((link) => (
          <Tr key={link._id}>
            <Link as={Td} href={link.url} isExternal={true}>
              {link.title} <ExternalLinkIcon mx="2px" />
            </Link>
            <Td>{link.url}</Td>
            {editable && (
              <Td>
                <HStack>
                  <IconButton
                    variant="ghost"
                    size="xs"
                    aria-label="Edit Link"
                    icon={<EditIcon />}
                    onClick={() => onEdit(link._id)}
                  />
                  <IconButton
                    variant="ghost"
                    size="xs"
                    aria-label="Remove Link"
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(link._id)}
                  />
                </HStack>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
