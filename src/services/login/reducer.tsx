import {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './constants';
import {ILoginState, IActionsLogin} from './types';

export const initialState: ILoginState = {
  errors: [],
  loading: false,
  email: '',
  password: '',
  access_token: '',
  callback: () => {},
};

const loginReducer = (state: ILoginState = initialState, action: IActionsLogin): ILoginState => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, errors: [], ...action.payload};
    case LOGIN_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    default:
      return state;
  }
};

export default loginReducer;
