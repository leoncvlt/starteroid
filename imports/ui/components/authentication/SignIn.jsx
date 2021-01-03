import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { VStack, Button, Input, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";

export const SignIn = ({ location }) => {
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const changedValue = { [event.target.name]: event.target.value };
    setUserInput((prevState) => ({ ...prevState, ...changedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = userInput;
    Meteor.loginWithPassword(email, password, (error) => {
      if (err) {
        setError(error.reason);
      } else {
        setError("");
        setRedirect(true);
      }
    });
  };

  const { from } = location && location.state ? location.state : { from: { pathname: "/" } };

  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return <Redirect to={from} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={handleChange} />
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
