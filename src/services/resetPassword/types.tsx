import {RESET_PASSWORD_REQUESTED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE} from './constants';

export interface IResetPasswordState {
  errors: any;
  loading: boolean;
  rePassword: string;
  password: string;
  callback?: any;
}
export interface IActionResetPasswordRequested {
  type: typeof RESET_PASSWORD_REQUESTED;
  payload: {
    rePassword: string;
    password: string;
  };
  callback?: any;
}
export interface IActionResetPasswordSuccess {
  type: typeof RESET_PASSWORD_SUCCESS;
  payload: {
    data: {
      access_token: string;
      email: string;
    };
    message: string;
    success: boolean;
  };
  callback?: any;
}
export interface IActionResetPasswordFailure {
  type: typeof RESET_PASSWORD_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}
export interface IFormData {
  rePassword: string;
  password: string;
  inviteCode: string;
}
export type IActionsResetPassword =
  | IActionResetPasswordRequested
  | IActionResetPasswordSuccess
  | IActionResetPasswordFailure;
