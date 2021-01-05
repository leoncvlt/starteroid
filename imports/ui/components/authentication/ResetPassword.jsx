import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { VStack, Button, Input, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";

export const passwordSchema = new SimpleSchema({
  password: {
    type: String,
    label: "password",
    min: 6,
  },
  confirmPassword: {
    type: String,
    label: "confirm password",
    min: 6,
    custom() {
      if (this.value !== this.field("password").value) {
        return "passwordMismatch";
      }
      return null;
    },
  },
});

const ResetPassword = () => {
  const [error, setError] = useState("");

  const history = useHistory();
  const { token } = useParams();

  const [userInput, setUserInput] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (event) => {
    const changedValue = { [event.target.name]: event.target.value };
    setUserInput((prevState) => ({ ...prevState, ...changedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const validate = new SimpleSchema(passwordSchema).validator({ clean: true });
      validate(userInput);
    } catch (exception) {
      setError(exception.message);
      return;
    }

    Accounts.resetPassword(token, userInput.newPassword, (error) => {
      if (error) {
        setError(error.reason);
      } else {
        alert("Your password was successfully reset!");
        history.push("/sign-in");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>New password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter a new password"
              value={userInput.newPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm new password</FormLabel>
            <Input
              name="confirmPassword"
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

export default ResetPassword;
