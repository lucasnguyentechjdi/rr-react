import {
  GET_FEED_FAILURE,
  GET_FEED_REQUESTED,
  GET_FEED_SUCCESS,
  SET_INDEX_ASK,
  SET_NETWORK_TO_INTRODUCE,
  SET_QUESTION_FOR_FEED,
  SET_USER_TO_SHARE,
} from './constants';
import {IActionsFeed, IFeedState} from './types';

export const initialState: IFeedState = {
  errors: '',
  loading: false,
  randomDataFeed: [],
  indexAsk: 0,
  infoAsk: {},
  userToShare: {},
  networks: [],
  callback: () => {},
};

const feedReducer = (state: IFeedState = initialState, action: IActionsFeed): IFeedState => {
  switch (action.type) {
    case GET_FEED_REQUESTED:
      return {...state, ...action.payload, callback: action?.callback, loading: true};
    case GET_FEED_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case GET_FEED_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    case SET_QUESTION_FOR_FEED:
      return {...state, infoAsk: action.payload};
    case SET_INDEX_ASK:
      return {...state, indexAsk: action.payload};
    case SET_USER_TO_SHARE:
      return {...state, userToShare: action.payload};
    case SET_NETWORK_TO_INTRODUCE:
      return {...state, networks: action.payload};
    default:
      return state;
  }
};

export default feedReducer;
