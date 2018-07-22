import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import CssBaseline from '@material-ui/core/CssBaseline'
import FormExample from './example/example';

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <FormExample />
    </React.Fragment>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();