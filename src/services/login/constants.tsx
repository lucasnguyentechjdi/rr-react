import {IAsyncCall} from '~Root/types';

export const LOGIN_REQUESTED = 'LOGIN/REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN/SUCCESS';
export const LOGIN_FAILURE = 'LOGIN/FAILURE';

export const ASYNC_LOGIN: IAsyncCall = {
  REQUESTED: LOGIN_REQUESTED,
  SUCCESS: LOGIN_SUCCESS,
  FAILURE: LOGIN_FAILURE,
};
