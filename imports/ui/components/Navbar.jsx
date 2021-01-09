import React from "react";
import {
  Heading,
  Flex,
  IconButton,
  useColorMode,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAccount } from "../../hooks/useAccount";
import { Link as RouterLink } from "react-router-dom";

export const Navbar = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { email, isLoggedIn, isSubscribed } = useAccount();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      mb={4}
      {...props}
    >
      <Flex align="center" ml={3}>
        <RouterLink to="/">
          <Heading as="h1" size="md">
            🌠 Astarteroid
          </Heading>
        </RouterLink>
      </Flex>

      <Flex align="center">
        <HStack>
          {isLoggedIn ? (
            <>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {email}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={RouterLink}
                    to={{ pathname: "/membership", state: { from: window.location.href } }}
                  >
                    {isSubscribed ? "Manage" : "Update"} Subscription
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/account">
                    Manage Account
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/sign-out">
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <RouterLink to="/sign-in">
                <Button>Sign In</Button>
              </RouterLink>
              <RouterLink to="/register">
                <Button>Register</Button>
              </RouterLink>
            </>
          )}

          <IconButton
            onClick={toggleColorMode}
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
