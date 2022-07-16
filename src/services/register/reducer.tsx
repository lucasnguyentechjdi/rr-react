import {
  REGISTER_REQUESTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILURE,
} from './constants';
import {IRegisterState, IActionsRegister} from './types';

export const initialState: IRegisterState = {
  errors: [],
  loading: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: '',
  inviteInfo: {
    code: '',
    secretCode: '',
    user: null,
  },
  callback: () => {},
};

const registerReducer = (state: IRegisterState = initialState, action: IActionsRegister): IRegisterState => {
  switch (action.type) {
    case REGISTER_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case REGISTER_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case REGISTER_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    case VERIFY_CODE_SUCCESS:
      return {...state, inviteInfo: action.payload.data};
    case VERIFY_CODE_FAILURE:
      return {
        ...state,
        inviteInfo: {
          code: '',
          secretCode: '',
          user: null,
        },
      };
    default:
      return state;
  }
};

export default registerReducer;
