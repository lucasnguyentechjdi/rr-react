import {
  CLEAR_PROGRESS,
  INITIALIZE_AUTH_FAILURE,
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  LOG_OUT_REQUESTED,
  SET_PROGRESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUESTED,
  VERIFY_EMAIL_SUCCESS,
} from './constants';
import {
  IActionInitializeAuthFailure,
  IActionSetProgress,
  IActionVerifyEmailFailure,
  IActionVerifyEmailSuccess,
} from './types';

export const initAuth = () => {
  return {type: INITIALIZE_AUTH_REQUESTED};
};

export const initAuthSuccess = () => {
  return {
    type: INITIALIZE_AUTH_SUCCESS,
  };
};

export const initAuthFailure = (payload: IActionInitializeAuthFailure['payload']) => {
  return {
    type: INITIALIZE_AUTH_FAILURE,
    payload,
  };
};

export const verifyEmailRequest = () => ({
  type: VERIFY_EMAIL_REQUESTED,
});

export const verifyEmailRequestSuccess = (payload: IActionVerifyEmailSuccess['payload']) => ({
  type: VERIFY_EMAIL_SUCCESS,
  payload,
});

export const verifyEmailRequestFailure = (payload: IActionVerifyEmailFailure['payload']) => ({
  type: VERIFY_EMAIL_FAILURE,
  payload,
});

export const onSetProgress = (payload: IActionSetProgress['payload']) => {
  return {type: SET_PROGRESS, payload};
};

export const onClearProgress = (payload: IActionSetProgress['payload']) => {
  return {type: CLEAR_PROGRESS, payload};
};

export const logout = () => {
  return {type: LOG_OUT_REQUESTED};
};
