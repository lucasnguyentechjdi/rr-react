import {IUser} from '../user/types';
import {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './constants';

export interface ILoginState {
  errors: any;
  loading: boolean;
  email: string;
  password: string;
  access_token: string;
  callback?: any;
}
export interface IActionLoginRequested {
  type: typeof LOGIN_REQUESTED;
  payload: {
    email: string;
    password: string;
    grant_type?: string;
  };
  callback?: any;
}

interface LoginSuccessAccount {
  result: {
    account: IUser;
  };
}

export interface IActionLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    data: any | LoginSuccessAccount;
    message: string;
    success: boolean;
  };
  callback?: any;
}
export interface IActionLoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}
export interface IFormData {
  email: string;
  password: string;
}
export type IActionsLogin = IActionLoginRequested | IActionLoginSuccess | IActionLoginFailure;
