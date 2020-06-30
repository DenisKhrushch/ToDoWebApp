import 'regenerator-runtime/runtime.js';
import { all } from 'redux-saga/effects';
import { userSaga, setToken } from '../user/sagas';
import { listSaga } from '../list/sagas';

export function* rootSaga() {
  yield all([listSaga(), setToken(), userSaga()]);
}
