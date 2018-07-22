import 'whatwg-fetch';
import { takeLatest, select, call, put } from 'redux-saga/effects';

import { ActionTypes } from './types';
import * as Actions from './actions';

import { handleFormSubmit } from '../common/form/saga';
import { flattenFormObjectSelector } from '../common/form/reducer';

export const request = async(endpoint, method, body = undefined) => {
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  const response = await fetch(`http://localhost:9999${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    return response.json().then((res) => {
      throw JSON.stringify(res.validationErrors);
    });
  }

  return response.json();
};

function* handleGetForms() {
  try {
    const response = yield call(async() =>
      request('/example', 'GET')
    );

    yield put(Actions.getExampleSuccess(response));
  } catch(e) {
    console.log('Problem with data fetch');
  }
}

function* handleSubmitExample() {
  const store = yield select();
  const payload = flattenFormObjectSelector(store);

  const response = yield call(async() =>
    request('/example/post', 'post', payload)
  );
  yield put(Actions.submitExampleSuccess(response));
}

export default function* example () {
  yield takeLatest(ActionTypes.getExample, handleGetForms);
  yield takeLatest(ActionTypes.submitExample, handleFormSubmit(handleSubmitExample));
}
