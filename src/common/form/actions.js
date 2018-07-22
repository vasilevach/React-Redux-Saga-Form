import { ActionTypes } from './types';

export const initForm = (formName, fields) => ({
  type: ActionTypes.InitForm,
  payload: { formName, fields }
});

export const registerFields = (formName, formObject) => ({
  type: ActionTypes.RegisterFields,
  payload: { formName, formObject }
});

export const destroyForm = (formName) => ({
  type: ActionTypes.DestroyForm,
  payload: { formName }
});

export const changeFormField = (formName, fieldName, value) => ({
  type: ActionTypes.ChangeFormField,
  payload: { formName, fieldName, value }
});

export const updateFormField = (formName, fieldName, value, validations) => ({
  type: ActionTypes.UpdateFormField,
  payload: { formName, fieldName, value, validations }
});

export const touchForms = () => ({
  type: ActionTypes.TouchForms
});

export const showAggregatedErrors = () => ({
  type: ActionTypes.ShowAggregatedErrors
});

export const handleErrorsFromBackend  = (error) => ({
  type: ActionTypes.SubmitFailed,
  payload: { error }
});

export const formSubmissionFailed = () => ({
  type: ActionTypes.FormSubmissionFailed
});
