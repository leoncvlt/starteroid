import React from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  HStack,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export const LinksTable = ({ links, loading, editable, onEdit, onDelete }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>URL</Th>
            {editable && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {links &&
            links.map((link) => (
              <Tr key={link._id}>
                <Td>
                  <Link as={Link} href={link.url} isExternal={true}>
                    {link.title} <ExternalLinkIcon mx="2px" />
                  </Link>
                </Td>
                <Td>
                  <Text color="gray.500">{link.url}</Text>
                </Td>
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
    </Skeleton>
  );
};
