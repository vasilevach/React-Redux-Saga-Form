import { call, put, select, takeLatest } from 'redux-saga/effects';

import { getValidations, runValidations } from './utils';
import { createValidations } from './field-validation';
import { deepclone } from '../../utils';

import * as Actions from './actions';
import { ActionTypes } from './types';
import { hasAtLeastOneErrorInState } from './utils';

function* initForm({ payload }) {
  const { formName, fields } = payload;
  const clonedFields = deepclone(fields);

  const validations = createValidations(fields);

  const formFields = Object.values(clonedFields).reduce((modified, field) => {
    // let's build the object that we will save in our redux store:
    // We would like to save the validation constraints, and other BE data so we can use them on update.
    // We would like to save the formName, fieldName, value and current errors
    // We would like to note that this field is still not being touched, so that we do not show the errors right away!
    const fieldValue = field.value || '';

    const modifiedField = {
      ...field,
      value: fieldValue,
      isTouched: false,

      // We would like to validate all the fields before we register them. So we run the validations, if the backend
      // gives us a value: we use it. In other cases, we use an empty value for initial value
      activeErrorState: runValidations(field.name, fieldValue, validations[field.name]),
    };

    return {
      ...modified,
      [field.name]: modifiedField
    };
  }, {});

  yield put(Actions.registerFields(formName, formFields));
}

function* changeFormField(action) {
  const store = yield select();
  const { formName, fieldName, value } = action.payload;
  // get all the fields validations from the store
  const validations = getValidations(store.form[formName][fieldName].validations);

  yield put(
    Actions.updateFormField(
      formName,
      fieldName,
      value,
      runValidations(
        fieldName,
        value,
        validations
      )
    ));
}

function* handleDestroy() {
  const inputs = document.querySelectorAll('input[type=file]');

  Array.from(inputs).forEach((input) => document.body.removeChild(input));
}

export default function* form() {
  yield takeLatest(ActionTypes.InitForm, initForm);
  yield takeLatest(ActionTypes.ChangeFormField, changeFormField);
  yield takeLatest(ActionTypes.DestroyForm, handleDestroy);
}

export function handleFormSubmit(saga) {
  return function* callSaga(action) {
    // we check if there are any fields that have errors in the current state:
    const store = yield select();

    if (hasAtLeastOneErrorInState(store.form)) {
      yield [
        put(Actions.touchForms()),
        put(Actions.showAggregatedErrors()),
        put(Actions.formSubmissionFailed())
      ];
    } else {
      try {
        yield call(saga, action);
      } catch (error) {
        yield [
          put(Actions.touchForms()),
          put(Actions.handleErrorsFromBackend(JSON.parse(error))),
          put(Actions.showAggregatedErrors()),
          put(Actions.formSubmissionFailed())
        ];
      }
    }
  };
}
