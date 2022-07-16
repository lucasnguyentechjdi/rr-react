import {RESET_PASSWORD_REQUESTED} from './constants';
import {IActionResetPasswordRequested} from './types';

export const resetPasswordRequest = (payload: IActionResetPasswordRequested['payload'], callback: any) => {
  return {
    type: RESET_PASSWORD_REQUESTED,
    payload,
    callback,
  };
};
