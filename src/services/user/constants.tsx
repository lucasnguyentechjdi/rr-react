import { IAsyncCall, ISetAsyncCall } from '~Root/types';

export const USER_INFO_REQUESTED = 'USER_INFO/REQUESTED';
export const USER_INFO_SUCCESS = 'USER_INFO/SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO/FAILURE';

export const ASYNC_USER_INFO: IAsyncCall = {
  REQUESTED: USER_INFO_REQUESTED,
  SUCCESS: USER_INFO_SUCCESS,
  FAILURE: USER_INFO_FAILURE,
};

export const UPDATE_USER_PROFILE_REQUESTED = 'UPDATE_USER_PROFILE/REQUESTED';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE/SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE/FAILURE';

export const SET_DATA_USER_INFO = 'DATA_USER_INFO/SET';
export const ASYNC_SET_DATA_USER_INFO: ISetAsyncCall = {
  SET: SET_DATA_USER_INFO,
};

export const ON_CHANGE_RESPONDER = 'CHANGE_RESPONDER/ON';
export const ASYNC_ON_CHANGE_RESPONDER: ISetAsyncCall = {
  SET: ON_CHANGE_RESPONDER,
};

export const ON_CHANGE_INTRODUCER = 'CHANGE_INTRODUCER/ON';
export const ASYNC_ON_CHANGE_INTRODUCER: ISetAsyncCall = {
  SET: ON_CHANGE_INTRODUCER,
};

export const ON_REVOKE_INVITE = 'REVOKE_INVITE/ON';
export const ASYNC_ON_REVOKE_INVITE: ISetAsyncCall = {
  SET: ON_REVOKE_INVITE,
};

export const SET_USER_PROFILE = 'USER_PROFILE/SET';
export const ASYNC_SET_USER_PROFILE: ISetAsyncCall = {
  SET: SET_USER_PROFILE,
};

export const SET_USER_PROFILE_REFER = 'USER_PROFILE_REFER/SET';
export const ASYNC_SET_USER_PROFILE_REFER: ISetAsyncCall = {
  SET: SET_USER_PROFILE_REFER,
};

export const SET_USER_PROFILE_AVATAR = 'USER_PROFILE_AVATAR/SET';
export const ASYNC_SET_USER_PROFILE_AVATAR: ISetAsyncCall = {
  SET: SET_USER_PROFILE_AVATAR,
};
export const SET_USER_PROFILE_TEMP = 'USER_PROFILE_TEMP/SET';

export const GET_USER_REFER_REQUESTED = 'GET_USER_REFER/REQUESTED';
export const GET_USER_REFER_SUCCESS = 'GET_USER_REFER/SUCCESS';
export const GET_USER_REFER_FAILURE = 'GET_USER_REFER/FAILURE';
export const ASYNC_USER_REFER: IAsyncCall = {
  REQUESTED: GET_USER_REFER_REQUESTED,
  SUCCESS: GET_USER_REFER_SUCCESS,
  FAILURE: GET_USER_REFER_FAILURE,
};

export const SET_USER_INDUSTRY = 'USER_INDUSTRY/SET';
export const DELETE_DATA_INDUSTRY = 'DELETE_INDUSTRY_SELECTED/SET';
export const GET_INVITE_DATA = 'GET_INVITE_DATA';
export const GET_NETWORK_DATA = 'GET_NETWORK_DATA';
export const GET_INVITE_DATA_SUCCESS = 'GET_INVITE_DATA_SUCCESS';
export const GET_NETWORK_DATA_SUCCESS = 'GET_NETWORK_DATA_SUCCESS';
export const ON_REMOVE_INVITE = 'REMOVE_INVITE';
export const GET_ASK_DATA = 'GET_ASK_DATA';
export const GET_ASK_DATA_SUCCESS = 'GET_ASK_DATA_SUCCESS';
export const GET_ASK_PAGE_DATA_SUCCESS = 'GET_ASK_PAGE_DATA_SUCCESS';

export const CHANGE_SELL_ALL_BUSINESS = 'CHANGE_SELL_ALL_BUSINESS';

export const LOG_OUT_REQUESTED = 'LOG_OUT/REQUESTED';
export const LOG_OUT_SUCCESS = 'LOG_OUT/SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT/FAILURE';

export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';