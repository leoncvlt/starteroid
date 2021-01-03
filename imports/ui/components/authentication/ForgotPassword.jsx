// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import {
  Stack,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    email: "",
  });

  const handleChange = (event) => {
    const changedValue = { [event.target.name]: event.target.value };
    setUserInput((prevState) => ({ ...prevState, ...changedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = userInput;
    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        setError(error.reason);
      } else {
        alert("Check your email for a reset link");
        history.push("/sign-in");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>Account E-mail</FormLabel>
            <Input name="email" type="email" placeholder="E-mail address" onChange={handleChange} />
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
