import { ActionTypes } from './types';

function exampleReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.getExampleSuccess:
      return {
        ...state,
        ...action.payload
      };
    case ActionTypes.submitExampleSuccess:
      return {
        ...state,
        showSuccess: true
      };
    default:
      return state;
  }
}

export default exampleReducer;
