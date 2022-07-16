import {IActionRegisterRequested, IActionVerifyOTP, IStatus} from './types';
import {REGISTER_REQUESTED, REGISTER_SUCCESS, VERIFY_CODE_REQUESTED, VERIFY_OTP_REQUESTED} from './constants';

export const registerRequest = (
  payload: IActionRegisterRequested['payload'],
  callback: (response: IStatus) => void,
) => {
  return {
    type: REGISTER_REQUESTED,
    payload,
    callback,
  };
};

export const verifyCode = (payload: string, callback: (response: IStatus) => void) => {
  return {
    type: VERIFY_CODE_REQUESTED,
    payload,
    callback,
  };
};

export const verifyOTP = (payload: IActionVerifyOTP['payload'], callback: (response: IStatus) => void) => {
  return {
    type: VERIFY_OTP_REQUESTED,
    payload,
    callback,
  };
};

export const registerSuccess = (email: string, password: string) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {email, password, rePassword: password},
  };
};
