import { deepclone } from '../../utils';
import { ActionTypes } from './types';

export const initialState = {
  showAggregatedErrorsCount: 0
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RegisterFields: {
      const { formName, formObject } = action.payload;
      const formClone = deepclone(state);

      if (Object.keys(formObject).length) {
        formClone[formName] = formObject;
      }

      return formClone;
    }

    case ActionTypes.UpdateFormField: {
      const { formName, fieldName, value, validations } = action.payload;
      const formClone = deepclone(state);
      const fieldClone = formClone[formName][fieldName];

      // it is time to show errors, if there are some
      if (!fieldClone.isTouched) {
        fieldClone.isTouched = true;
      }

      fieldClone.value = value;
      fieldClone.activeErrorState = validations;

      return formClone;
    }

    case ActionTypes.TouchForms: {
      const formClone = deepclone(state);
      Object.keys(formClone).forEach((form) => {
        Object.keys(formClone[form]).forEach((field) => {
          formClone[form][field].isTouched = true;
        });
      });

      return formClone;
    }

    case ActionTypes.SubmitFailed: {
      const errorsFromBackend = action.payload.error;
      const formClone = deepclone(state);
      const arrayIntersections = Object.keys(errorsFromBackend).filter({}.hasOwnProperty.bind(formClone))

      arrayIntersections.forEach((formName) => {
        Object.keys(formClone[formName]).forEach((field) => {
          Object.keys(errorsFromBackend[formName]).forEach((error) => {
            if (field === error) {
              formClone[formName][field].activeErrorState = {
                hasError: true,
                message: errorsFromBackend[formName][error]
              }
            }
          })
        })
      });

      return {
        ...formClone,
        showAggregatedErrorsCount: state.showAggregatedErrorsCount
      };
    }

    case ActionTypes.ShowAggregatedErrors:
      return {
        ...state,
        showAggregatedErrorsCount: ++state.showAggregatedErrorsCount
      };

    case ActionTypes.DestroyForm: {
      const { formName } = action.payload;
      const formClone = deepclone(state);

      delete formClone[formName];

      return {
        ...formClone,
        showAggregatedErrorsCount: 0
      };
    }

    default:
      return state;
  }
}

export default formReducer;

// Form selectors:

export function flattenFormObjectSelector(state) {
  const allForms = state.form;

  return Object.values(allForms).reduce((all, form) => {
    if (typeof form === 'object') {
      return { ...all, ...Object.values(form).reduce((fields, field) => ({...fields, [field.name] : field.value}), {}) }
    } else {
      return all;
    }
  })
}
