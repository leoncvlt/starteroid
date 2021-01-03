import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";
import { VStack, Button, Input, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";
import { newPasswordSchema } from "./ResetPassword";

export const ChangePassword = () => {
  const [error, setError] = useState("");
  const defaultState = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [userInput, setUserInput] = useState(defaultState);

  const changePasswordSchema = newPasswordSchema.extend({
    currentPassword: {
      type: String,
      min: 6,
    },
  });

  const handleChange = (event) => {
    const changedValue = { [event.target.name]: event.target.value };
    setUserInput((prevState) => ({ ...prevState, ...changedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const validate = new SimpleSchema(changePasswordSchema).validator({ clean: true });
      validate(userInput);
    } catch (exception) {
      setError(exception.message);
      return;
    }

    Accounts.changePassword(userInput.currentPassword, userInput.newPassword, (error) => {
      if (error) {
        setError(error.reason);
      } else {
        alert("Your password was successfully changed!");
        setUserInput(defaultState);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>Current password</FormLabel>
            <Input
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
              value={userInput.currentPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>New password</FormLabel>
            <Input
              name="newPassword"
              type="password"
              placeholder="Enter a new password"
              value={userInput.newPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm new password</FormLabel>
            <Input
              name="confirmNewPassword"
              type="password"
              placeholder="Repeat your new password"
              value={userInput.confirmNewPassword}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </>
  );
};
