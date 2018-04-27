import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //allows you to write action creators that return a function instead of an action
import { createLogger } from 'redux-logger'; //logs out state in console
import rootReducer from '../reducers';

const logger = createLogger();

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
  );
};
