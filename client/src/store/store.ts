import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { history } from '../history/history';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare, routerMiddleware(history)),
  ),
);

sagaMiddleWare.run(rootSaga);
