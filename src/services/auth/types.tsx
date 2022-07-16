import {
  CLEAR_PROGRESS,
  INITIALIZE_AUTH_FAILURE,
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUESTED,
  LOG_OUT_SUCCESS,
  SET_PROGRESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUESTED,
  VERIFY_EMAIL_SUCCESS,
} from './constants';

// Notes state
export interface IAuthState {
  error: any;
  loading: boolean;
  isAppReady: boolean;
  isLoggedIn: boolean;
  token: string;
  progress: number;
}

// Procedures actions
export interface IActionInitializeAuthRequested {
  type: typeof INITIALIZE_AUTH_REQUESTED;
  payload: any;
}
export interface IActionInitializeAuthSuccess {
  type: typeof INITIALIZE_AUTH_SUCCESS;
  payload: {
    token: string;
  };
}
export interface IActionInitializeAuthFailure {
  type: typeof INITIALIZE_AUTH_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionVerifyEmailRequested {
  type: typeof VERIFY_EMAIL_REQUESTED;
  payload: {
    email: string;
    code: string;
  };
}
export interface IActionVerifyEmailSuccess {
  type: typeof VERIFY_EMAIL_SUCCESS;
  payload: {
    token: string;
  };
}
export interface IActionVerifyEmailFailure {
  type: typeof VERIFY_EMAIL_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionSetProgress {
  type: typeof SET_PROGRESS;
  payload: {
    progress: number;
  };
}

export interface IActionClearProgress {
  type: typeof CLEAR_PROGRESS;
  payload: {
    progress: number;
  };
}

export interface IActionLogoutRequested {
  type: typeof LOG_OUT_REQUESTED;
}
export interface IActionLogoutSuccess {
  type: typeof LOG_OUT_SUCCESS;
  payload: {
    token: '';
  };
}
export interface IActionLogoutFailure {
  type: typeof LOG_OUT_FAILURE;
  payload: {
    error: string;
  };
}

export type IActionsAuth =
  | IActionInitializeAuthRequested
  | IActionInitializeAuthSuccess
  | IActionInitializeAuthFailure
  | IActionVerifyEmailRequested
  | IActionVerifyEmailSuccess
  | IActionVerifyEmailFailure
  | IActionSetProgress
  | IActionClearProgress
  | IActionLogoutRequested
  | IActionLogoutSuccess
  | IActionLogoutFailure;
