import {LOGIN_REQUESTED} from './constants';
import {IActionLoginRequested} from './types';

export const loginRequest = (payload: IActionLoginRequested['payload'], callback: any) => {
  return {
    type: LOGIN_REQUESTED,
    payload,
    callback,
  };
};
