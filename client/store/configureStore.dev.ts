import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../action/index';

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(
      createLogger(),
    )),
  );
}
