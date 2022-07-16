import {GET_MATCHES_REQUESTED, GET_MATCHES_SUCCESS, GET_MATCHES_FAILURE, SET_DATA_MATCHES} from './constants';
import {IMatchesState, IActionsUser} from './types';

export const initialState: IMatchesState = {
  errors: [],
  loading: false,
  matches: [],
  matchesSelected: [],
  callback: () => {},
};

const userReducer = (state: IMatchesState = initialState, action: IActionsUser): IMatchesState => {
  switch (action.type) {
    case GET_MATCHES_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_MATCHES_SUCCESS:
      return {...state, loading: false, matches: action?.payload?.data || [], errors: [action?.payload?.message]};
    case GET_MATCHES_FAILURE:
      return {...state, loading: false, errors: [action.payload.error]};
    case SET_DATA_MATCHES:
      return {...state, matchesSelected: [action?.payload]};
    default:
      return state;
  }
};

export default userReducer;
