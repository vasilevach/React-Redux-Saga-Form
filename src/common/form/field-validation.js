export const createValidations = (fields) => Object.keys(fields).reduce((acc, key) => ({
  ...acc,
  [key]: getValidations(fields[key].validations)
}), {});

export const required = (message = 'This field is required') => (text) => {
  const hasError = !text;

  return {
    hasError,
    message: hasError ? message : null
  };
};

/* Regex validations */
export const matchRegExp = (regexp, message) => {
  return (text) => {
    if (!Boolean(text)) {
      return {
        hasError: false,
        message: null
      };
    }
    const pattern = new RegExp(regexp);
    const hasError = pattern.test(text) === false;

    return {
      hasError,
      message: hasError ? message : null
    };
  };
};

export const getValidations = (validations = []) => {
  if (!validations) {
    return [];
  }

  return validations.map((validation) => {
    switch (validation.name) {
      case 'required':
        return required(validation.error);
      case 'regex':
        return matchRegExp(validation.value, validation.error);
      case 'choice':
        return () => ({ hasError: false });
      default:
        return () => ({ hasError: false });
    }
  });
};

export const runValidations = (fieldName, text, validations) => {

  const firstValidationError = validations
    .map((validation) => validation(text))
    .find((validation) => validation.hasError);

  return firstValidationError ? firstValidationError : {
    hasError: false,
    message: ''
  };
};

export const isValid = (validations) => {
  const error = Object.keys(validations).find((key) => validations[key].hasError);

  return error ? false : true;
};
