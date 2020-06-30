import {
  USER_ACTIONS,
  SetToken,
  RegisterSuccess,
  RegisterFail,
  LoginSuccess,
  LoginRequest,
  LoginFail,
  LogoutInterface,
} from './actionTypes';

export interface UserState {
  accessToken: string;
  loading: boolean;
  registerResponseMessage: string;
  loginResponseMessage: string;
}

const initialState: UserState = {
  accessToken: '',
  loading: false,
  registerResponseMessage: '',
  loginResponseMessage: '',
};

type UserReducerAction =
  | SetToken
  | RegisterSuccess
  | RegisterFail
  | LoginSuccess
  | LoginRequest
  | LoginFail
  | LogoutInterface;

export const userReducer = (
  state = initialState,
  action: UserReducerAction,
) => {
  switch (action.type) {
    case USER_ACTIONS.SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case USER_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
      };
    case USER_ACTIONS.REGISTER_FAIL:
      return {
        ...state,
        registerResponseMessage: action.payload.registerResponseMessage,
      };
    case USER_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginResponseMessage: '',
      };
    case USER_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.token,
        loading: false,
        loginResponseMessage: '',
      };
    case USER_ACTIONS.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loginResponseMessage: action.payload.loginResponseMessage,
      };
    case USER_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        accessToken: '',
      };
    default:
      return state;
  }
};
