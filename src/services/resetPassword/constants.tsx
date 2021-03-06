import {IAsyncCall} from '~Root/types';

export const RESET_PASSWORD_REQUESTED = 'RESET_PASSWORD/REQUESTED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD/SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD/FAILURE';

export const ASYNC_RESET_PASSWORD: IAsyncCall = {
  REQUESTED: RESET_PASSWORD_REQUESTED,
  SUCCESS: RESET_PASSWORD_SUCCESS,
  FAILURE: RESET_PASSWORD_FAILURE,
};
