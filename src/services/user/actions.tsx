import {
  CHANGE_SELL_ALL_BUSINESS,
  DELETE_DATA_INDUSTRY,
  GET_ASK_DATA,
  GET_INVITE_DATA,
  GET_NETWORK_DATA,
  GET_USER_REFER_REQUESTED,
  LOG_OUT_SUCCESS,
  ON_CHANGE_INTRODUCER,
  ON_CHANGE_RESPONDER,
  ON_REMOVE_INVITE,
  ON_REVOKE_INVITE,
  SET_DATA_USER_INFO,
  SET_USER_INDUSTRY,
  SET_USER_PROFILE,
  SET_USER_PROFILE_AVATAR,
  SET_USER_PROFILE_REFER,
  SET_USER_PROFILE_TEMP,
  UPDATE_USER_PROFILE_REQUESTED,
  USER_INFO_REQUESTED,
} from './constants';
import {IActionSetDataUserInfo, IAvatar, IProfileNew, IUser} from './types';

import {IInvite} from '../invite/types';
import {INetwork} from '~Root/services/network/types';

export const userInfoRequest = (callback?: (item: any) => void) => {
  return {
    type: USER_INFO_REQUESTED,
    callback,
  };
};

export const updateUserProfileRequest = (payload: any, callback: (item: any) => void) => {
  return {
    type: UPDATE_USER_PROFILE_REQUESTED,
    payload,
    callback,
  };
};

export const setDataUserInfo = (payload: IActionSetDataUserInfo['payload']) => {
  return {
    type: SET_DATA_USER_INFO,
    payload,
  };
};

export const onChangeReponder = (payload: string, callback: () => void) => {
  return {
    type: ON_CHANGE_RESPONDER,
    payload,
    callback,
  };
};

export const onChangeIntroducer = (payload: string, callback: () => void) => {
  return {
    type: ON_CHANGE_INTRODUCER,
    payload,
    callback,
  };
};

export const onRevokeInvite = (payload: any) => {
  return {
    type: ON_REVOKE_INVITE,
    payload,
  };
};

export const setUserProfile = (payload: IUser) => {
  return {
    type: SET_USER_PROFILE,
    payload,
  };
};

export const setUserProfileRefer = (payload: INetwork) => {
  return {
    type: SET_USER_PROFILE_REFER,
    payload,
  };
};

export const setUserProfileAvatar = (payload: IAvatar) => {
  return {
    type: SET_USER_PROFILE_AVATAR,
    payload,
  };
};

export const setUserProfileTemp = (payload: IProfileNew) => {
  return {
    type: SET_USER_PROFILE_TEMP,
    payload,
  };
};

export const userReferRequest = (payload: string, callback: () => void) => {
  return {
    type: GET_USER_REFER_REQUESTED,
    payload,
    callback,
  };
};

export const setUserIndustry = (payload: IUser) => {
  return {
    type: SET_USER_INDUSTRY,
    payload,
  };
};

export const deleteUserIndustry = (payload: {index: number; target: string}) => {
  return {
    type: DELETE_DATA_INDUSTRY,
    payload,
  };
};

export const getUserInviteData = () => {
  return {
    type: GET_INVITE_DATA,
  };
};

export const getUserNetworkData = () => {
  return {
    type: GET_NETWORK_DATA,
  };
};

export const onRemoveInvite = (payload: IInvite | null) => {
  return {
    type: ON_REMOVE_INVITE,
    payload,
  };
};

export const onLogout = () => {
  return {type: LOG_OUT_SUCCESS, payload: true};
};

export const onChangeSellAllBusiness = (payload: boolean) => {
  return {type: CHANGE_SELL_ALL_BUSINESS, payload};
};

export const getUserAskData = (page: number, limit: number, append = false) => {
  return {
    type: GET_ASK_DATA,
    payload: {page, limit, append},
  };
};

export const getFullName = (user?: IUser) => {
  return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
};
