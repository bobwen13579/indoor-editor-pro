import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router';


const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

import(`./store/configureStore.${env}`).then(({ default: configureStore }) => {
  render(
      <Provider store={configureStore()}>
        <Router />
      </Provider>,
    document.getElementById('app'),
  );
});
