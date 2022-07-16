import {
  CLEAR_PROGRESS,
  INITIALIZE_AUTH_FAILURE,
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  LOG_OUT_SUCCESS,
  SET_PROGRESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUESTED,
  VERIFY_EMAIL_SUCCESS,
} from './constants';
import {IActionsAuth, IAuthState} from './types';

export const initialState: IAuthState = {
  error: [],
  loading: true,
  token: '',
  isAppReady: false,
  isLoggedIn: false,
  progress: 240,
};

const authReducer = (state: IAuthState = initialState, action: IActionsAuth): IAuthState => {
  switch (action.type) {
    case INITIALIZE_AUTH_REQUESTED:
    case SET_PROGRESS:
      return {...state, ...action?.payload};
    case CLEAR_PROGRESS:
    case VERIFY_EMAIL_REQUESTED:
      return {...state, ...action?.payload, loading: true};
    case INITIALIZE_AUTH_SUCCESS:
      return {...state, loading: false, isAppReady: true, isLoggedIn: true};
    case VERIFY_EMAIL_SUCCESS:
      return {...state, loading: false, ...action?.payload};
    case INITIALIZE_AUTH_FAILURE:
    case VERIFY_EMAIL_FAILURE:
      return {...state, loading: false, isAppReady: true, isLoggedIn: false, error: action?.payload?.error};
    case LOG_OUT_SUCCESS:
      return {...state, loading: false, isAppReady: true, isLoggedIn: false, ...action?.payload};
    default:
      return state;
  }
};

export default authReducer;
