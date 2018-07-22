import { ActionTypes } from './types';

export const getExample = () => ({
  type: ActionTypes.getExample
});

export const getExampleSuccess = (payload) => ({
  type: ActionTypes.getExampleSuccess,
  payload
});

export const submitExample = () => ({
  type: ActionTypes.submitExample
});

export const submitExampleSuccess = () => ({
  type: ActionTypes.submitExampleSuccess
});
