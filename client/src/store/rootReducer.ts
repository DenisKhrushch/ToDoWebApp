import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { listReducer } from '../list/reducer';
import { userReducer } from '../user/reducer';

export const rootReducer = (history: any) =>
  combineReducers({
    listReducer,
    userReducer,
    router: connectRouter(history),
  });
