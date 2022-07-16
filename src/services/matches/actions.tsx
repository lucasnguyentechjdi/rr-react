import {GET_MATCHES_REQUESTED, SET_DATA_MATCHES} from './constants';
import {IMatch} from './types';

export const getMatchRequest = (callback: any) => {
  return {
    type: GET_MATCHES_REQUESTED,
    callback,
  };
};

export const setMatch = (payload: IMatch) => {
  return {
    type: SET_DATA_MATCHES,
    payload,
  };
};
