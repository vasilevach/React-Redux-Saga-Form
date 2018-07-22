const createValidations = (validations = []) => {
  return validations.map((item) => {

    switch (item) {
      case 'required':
        return {
          name: item,
          error: 'This field should not be left empty'
        };
    }
    return {
      name: item,
      error_message: ''
    };
  });
};

export const createCustomFieldConfiguration = (config) => {
  return config.reduce((fields, field) => ({
    ...fields,
    [field.name]: {
      name: field.name,
      label: field.label || field.name,
      readonly: field.readonly || false,
      value: field.value || '',
      validations: createValidations(field.validations)
    }
  }), {});
};

export const hasAtLeastOneErrorInState = (forms) => {
  return Object.values(forms).some((form) =>
    Object.values(form).some((field) => (field.activeErrorState.hasError && !field.disabled))
  );
};

export * from './field-validation';
