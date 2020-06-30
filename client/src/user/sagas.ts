import { history } from './../history/history';
import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_ACTIONS, RegisterRequest, LoginRequest } from './actionTypes';
import { loginAPI, registerAPI } from '../api/user';

function* register(action: RegisterRequest) {
  const { username, password } = action.payload.user;
  const { responseStatus, data } = yield call(registerAPI, action.payload.user);
  if (responseStatus >= 400 && responseStatus <= 599) {
    yield put({
      type: USER_ACTIONS.REGISTER_FAIL,
      payload: { registerResponseMessage: data.MESSAGE },
    });
  } else {
    yield put({
      type: USER_ACTIONS.REGISTER_SUCCESS,
    });
    yield put({
      type: USER_ACTIONS.LOGIN_REQUEST,
      payload: {
        user: { username, password },
        loginResponseMessage: '',
      },
    });
  }
}
function* login(action: LoginRequest) {
  const { responseStatus, data } = yield call(loginAPI, action.payload.user);
  if (responseStatus >= 400 && responseStatus <= 599) {
    yield put({
      type: USER_ACTIONS.LOGIN_FAIL,
      payload: { loginResponseMessage: data.MESSAGE },
    });
  } else {
    localStorage.setItem('token', data.token);
    yield put({
      type: USER_ACTIONS.LOGIN_SUCCESS,
      payload: {
        token: data.token,
      },
    });
    history.push('/');
  }
}

export function* setToken() {
  if (localStorage.getItem('token')) {
    yield put({
      type: USER_ACTIONS.SET_TOKEN,
      payload: { accessToken: localStorage.getItem('token') },
    });
  }
}

export function* userSaga() {
  yield takeEvery(USER_ACTIONS.REGISTER_REQUEST, register);
  yield takeEvery(USER_ACTIONS.LOGIN_REQUEST, login);
}
