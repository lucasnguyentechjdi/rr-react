import {
  CHANGE_SELL_ALL_BUSINESS,
  DELETE_DATA_INDUSTRY,
  GET_ASK_DATA_SUCCESS,
  GET_ASK_PAGE_DATA_SUCCESS,
  GET_INVITE_DATA_SUCCESS,
  GET_NETWORK_DATA_SUCCESS,
  GET_USER_REFER_FAILURE,
  GET_USER_REFER_REQUESTED,
  GET_USER_REFER_SUCCESS,
  LOG_OUT_SUCCESS,
  ON_REVOKE_INVITE,
  REMOVE_SUGGESTION,
  SET_DATA_USER_INFO,
  SET_USER_INDUSTRY,
  SET_USER_PROFILE,
  SET_USER_PROFILE_AVATAR,
  SET_USER_PROFILE_REFER,
  SET_USER_PROFILE_TEMP,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_INFO_FAILURE,
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
} from './constants';
import { IAsk, IAskForm } from '~Root/services/ask/types';

import { CountryCode } from 'react-native-country-picker-modal';
import { IFeedInfoState } from '~Root/services/feed/types';
import { IIndustry } from '~Root/services/industry/types';
import { IInvite } from '../invite/types';
import { INetwork } from '../network/types';

export interface IUser {
  code: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  name: string;
  title: string;
  userRole: string;
  emailVerify: boolean;
  profileCompleted: boolean;
  introduction: string;
  industries: string[];
  yourIndustries: string[];
  partnerIndustries: string[];
  sellToIndustries: string[];
  sellToAllBusiness: boolean | undefined;
  avatar: string;
  inviteMax: number;
  token: string;
  isSuggest?: boolean;
}

export interface IMyAskDefault {
  purpose_of_ask?: string | '';
  a_provider_of?: string | '';
  from_company?: string | '';
  to_talk_about?: string | '';
  looking_for?: string | '';
  based_in?: string | '';
  within_next?: string | '';
}

export interface IMyAsk extends IMyAskDefault {
  id?: string | undefined;
  public_link_id?: string;
  other_info?: string | null;
}

export interface ISellTo {
  id: string;
  name: string;
}
export interface IPartners {
  id: string;
  name: string;
}
export interface IProfile {
  name?: string;
  title?: string;
  description?: string;
  sell_to?: ISellTo[];
  partners?: IPartners[];
}
export interface IProfileNew {
  first_name?: string;
  last_name?: string;
  title?: string;
  introduction?: string;
  industries?: {
    myself: string[];
    client: string[];
    partner: string[];
  };
}

export interface ITrustNetWorkMySelf {
  company_name?: string;
  company_role?: string;
}
export interface ITrustNetwork {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  country_code?: CountryCode | undefined;
  calling_code?: string;
  myself?: ITrustNetWorkMySelf;
  profile_photo?: string;
  status: number; // 0:pending, 1: active
  date_invite?: Date;
}

export interface IMyPartner {
  industry: IIndustry[];
}
export interface IMyClient {
  industry: IIndustry[];
}
export interface IMySelf {
  industry?: IIndustry[];
  biztype: string;
  self_intro: string;
}
export interface IIndustries {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface IResponder {
  id: string;
  name: string;
  avatar?: string;
}
export interface IIntroducer {
  id: string;
  name: string;
  avatar: string;
}
export interface ITags {
  id: string;
  name: string;
}
export interface IAvatar {
  name?: string;
  type?: string;
  uri?: string;
}

export interface IUserInfoState {
  id?: number;
  user_id?: number;
  first_name: string;
  last_name: string;
  title?: string;
  introduction?: string;
  industries: {
    myself: string[] | IIndustry[];
    client: string[] | IIndustry[];
    partner: string[] | IIndustry[];
  };
  industriesUpdate?: {
    myself: string[];
    client: string[];
    partner: string[];
  };
  network_reach: number;
  trust_network: ITrustNetwork[];
  invites_left: number;
  invoke_invite: ITrustNetwork | null;
  my_ask: IAskForm[];
  my_ask_selected: IAskForm | null;
  responder: IResponder[];
  responder_selected?: string;
  introducer?: IIntroducer[];
  introducer_selected?: string;
  tags: ITags[];
  avatar?: {
    url?: string;
  };
  profile_completed: boolean;
}

export interface IUserState {
  errors: any;
  loading: boolean;
  userInfo: IUser;
  profile: IFeedInfoState | null;
  profile_refer: IFeedInfoState | null;
  userRefer: {
    data: IFeedInfoState[] | null;
    textSearch: string;
  };
  networks: INetwork[];
  invites: IInvite[];
  asks: IAsk[];
  askPagination: any;
  invokeInvite: any;
  avatar_temp?: IAvatar | null;
  profile_temp?: IProfileNew | null;
  callback?: () => void;
}

export interface IActionUserInfoRequested {
  type: typeof USER_INFO_REQUESTED;
  payload: {
    token: string;
  };
  callback?: any;
}
export interface IActionUserInfoSuccess {
  type: typeof USER_INFO_SUCCESS;
  payload: {
    data: {
      result: IUser;
    };
    success: boolean;
    message: string;
  };
  callback?: any;
}
export interface IActionUserInfoFailure {
  type: typeof USER_INFO_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}

export interface IActionSetDataUserInfo {
  type: typeof SET_DATA_USER_INFO;
  payload: {
    data: IAskForm;
  };
}

export interface IActionOnRevokeInvite {
  type: typeof ON_REVOKE_INVITE;
  payload: any;
}

export interface IActionSetUserProfile {
  type: typeof SET_USER_PROFILE;
  payload: IFeedInfoState;
}

export interface IActionSetUserProfileRefer {
  type: typeof SET_USER_PROFILE_REFER;
  payload: IFeedInfoState;
}

export interface IActionSetUserProfileAvatar {
  type: typeof SET_USER_PROFILE_AVATAR;
  payload: IAvatar;
}

export interface IActionSetUserProfileTemp {
  type: typeof SET_USER_PROFILE_TEMP;
  payload: IProfileNew;
}

export interface IActionGetUserReferRequested {
  type: typeof GET_USER_REFER_REQUESTED;
  payload: string;
  callback?: () => void;
}

export interface IActionGetUserReferSuccess {
  type: typeof GET_USER_REFER_SUCCESS;
  payload: {
    data: IFeedInfoState[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionGetUserReferFailure {
  type: typeof GET_USER_REFER_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionUpdateUserProfileRequested {
  type: typeof UPDATE_USER_PROFILE_REQUESTED;
  payload: any;
  callback?: () => void;
}

export interface IActionUpdateUserProfileSuccess {
  type: typeof UPDATE_USER_PROFILE_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionUpdateUserProfileFailure {
  type: typeof UPDATE_USER_PROFILE_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionSetUserIndustry {
  type: typeof SET_USER_INDUSTRY;
  payload: IUserInfoState['industries'];
}

export interface IActionDeleteUserIndustry {
  type: typeof DELETE_DATA_INDUSTRY;
  payload: {
    index: number;
    target: string;
  };
}

export interface IActionUserInvite {
  type: typeof GET_INVITE_DATA_SUCCESS;
  payload: {
    data: IInvite[];
  };
}

export interface IActionUserNetwork {
  type: typeof GET_NETWORK_DATA_SUCCESS;
  payload: {
    data: INetwork[];
  };
}

export interface IActionLogOut {
  type: typeof LOG_OUT_SUCCESS;
  payload: any;
}

export interface IActionChangeSellAllBusiness {
  type: typeof CHANGE_SELL_ALL_BUSINESS;
  payload: any;
}

export interface IActionGetAskSuccess {
  type: typeof GET_ASK_DATA_SUCCESS;
  payload: {
    data: IAsk[];
    metadata: any;
  };
}

export interface IActionGetAskPageSuccess {
  type: typeof GET_ASK_PAGE_DATA_SUCCESS;
  payload: {
    data: IAsk[];
    metadata: any;
  };
}

export interface IActionRemoveSuggestion {
  type: typeof REMOVE_SUGGESTION;
}

export type IActionsUser =
  | IActionUserInfoRequested
  | IActionUserInfoSuccess
  | IActionUserInfoFailure
  | IActionSetDataUserInfo
  | IActionOnRevokeInvite
  | IActionSetUserProfile
  | IActionSetUserProfileRefer
  | IActionGetUserReferRequested
  | IActionGetUserReferSuccess
  | IActionGetUserReferFailure
  | IActionSetUserProfileAvatar
  | IActionSetUserProfileTemp
  | IActionUpdateUserProfileRequested
  | IActionUpdateUserProfileSuccess
  | IActionUpdateUserProfileFailure
  | IActionSetUserIndustry
  | IActionDeleteUserIndustry
  | IActionUserInvite
  | IActionUserNetwork
  | IActionLogOut
  | IActionChangeSellAllBusiness
  | IActionGetAskSuccess
  | IActionGetAskPageSuccess
  | IActionRemoveSuggestion;
