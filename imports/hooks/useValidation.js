import { useState } from "react";

export const useValidation = (simpleSchema, clean = true) => {
  const [errors, setErrors] = useState([]);
  const validationContext = simpleSchema.newContext();

  const validate = (data) => {
    if (!simpleSchema) return [true, data];

    // validate the object against the schema
    const cleanedData = clean ? validationContext.clean(data) : data;
    validationContext.validate(cleanedData);

    // add the error message to any errors that might have arisen from the validation
    const errors = validationContext.validationErrors().map((error) => {
      const message = validationContext.keyErrorMessage(error.name);
      console.error(message);
      return { ...error, message };
    });
    setErrors(errors);

    return [validationContext.isValid(), cleanedData];
  };

  const hasError = (name) => errors.find((e) => e.name == name) != null;
  const errorText = (name) => errors.find((e) => e.name == name)?.message;

  return { validate, hasError, errorText };
};
