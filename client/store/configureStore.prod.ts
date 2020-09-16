import { createStore } from 'redux';
import rootReducer from '../action/index';

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
  );
}
