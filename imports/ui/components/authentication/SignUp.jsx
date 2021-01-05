import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { VStack, Button, Input, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";
import { passwordSchema } from "./ResetPassword";
import SimpleSchema from "simpl-schema";

export const SignUp = () => {
  const [error, setError] = useState("");
  const history = useHistory();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signupSchema = passwordSchema.extend({
    email: {
      type: SimpleSchema.RegEx.Email,
    },
  });

  const handleChange = (event) => {
    const changedValue = { [event.target.name]: event.target.value };
    setUserInput((prevState) => ({ ...prevState, ...changedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const validate = new SimpleSchema(signupSchema).validator({ clean: true });
      validate(userInput);
    } catch (exception) {
      setError(exception.message);
      return;
    }
    const { email, password } = userInput;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        history.push("/");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your e-mail address"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter a password"
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
