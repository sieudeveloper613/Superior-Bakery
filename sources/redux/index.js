import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './Reducers/rootReducers'
import { rootSaga } from './Saga/rootSaga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares
});

// then run the saga
sagaMiddleware.run(rootSaga);

export { store };
