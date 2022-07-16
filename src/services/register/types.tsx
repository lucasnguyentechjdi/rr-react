import {IUser} from '../user/types';
import {
  REGISTER_FAILURE,
  REGISTER_REQUESTED,
  REGISTER_SUCCESS,
  VERIFY_CODE_FAILURE,
  VERIFY_CODE_REQUESTED,
  VERIFY_CODE_SUCCESS,
  VERIFY_OTP_REQUESTED,
} from './constants';

export interface IStatus {
  success: boolean;
  message: string;
}

export interface IRegisterState {
  errors: any;
  loading: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  inviteInfo: {
    code: string;
    secretCode: string;
    user: IUser | null;
  };
  callback?: (item?: IStatus) => void;
}

export interface IActionRegisterRequested {
  type: typeof REGISTER_REQUESTED;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password_confirmation: string;
    inviteCode: string;
  };
  callback?: (item?: IStatus) => void;
}
export interface IActionRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: {
    data: {
      access_token: string;
      email: string;
    };
    message: string;
    success: boolean;
  };
  callback?: () => void;
}

export interface IActionVerifyOTP {
  type: typeof VERIFY_OTP_REQUESTED;
  payload: {
    email: string;
    code: string;
  };
  callback?: (item?: IStatus) => void;
}

export interface IActionRegisterFailure {
  type: typeof REGISTER_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionVerifyCodeRequested {
  type: typeof VERIFY_CODE_REQUESTED;
  payload: string;
  callback?: (item?: IStatus) => void;
}

export interface IActionVerifyCodeSuccess {
  type: typeof VERIFY_CODE_SUCCESS;
  payload: {
    data: any;
    message: string;
    success: boolean;
  };
  callback?: () => void;
}

export interface IActionVerifyCodeFailure {
  type: typeof VERIFY_CODE_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  grant_type?: string;
}

export type IActionsRegister =
  | IActionRegisterRequested
  | IActionRegisterSuccess
  | IActionRegisterFailure
  | IActionVerifyCodeSuccess
  | IActionVerifyCodeFailure;

export interface IParamListVerifyCode {
  inviteCode: string;
}
