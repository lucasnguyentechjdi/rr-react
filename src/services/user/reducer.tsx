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
import { IActionsUser, IUserState } from './types';
import messaging from '@react-native-firebase/messaging';
import { mergeUnique } from '~Root/utils/common';

const defaultUser = {
  code: '',
  email: '',
  firstName: '',
  lastName: '',
  userRole: 'user',
  emailVerify: true,
  phoneNumber: '',
  introduction: '',
  name: '',
  profileCompleted: false,
  industries: [],
  IUserState: [],
  partnerIndustries: [],
  sellToIndustries: [],
  title: '',
  avatar: '',
  sellToAllBusiness: true,
  isSuggest: false,
  token: '',
};

export const initialState: IUserState = {
  errors: [],
  loading: false,
  userInfo: defaultUser,
  networks: [],
  invites: [],
  asks: [],
  askPagination: {
    recordTotal: 1,
    pageCurrent: 1,
    recordPerPage: 50,
  },
  invokeInvite: null,
  profile: null,
  profile_refer: null,
  userRefer: {
    data: [],
    textSearch: '',
  },
  profile_temp: null,
  avatar_temp: null,
  callback: () => { },
};

const userReducer = (state: IUserState = initialState, action: IActionsUser): IUserState => {
  switch (action.type) {
    case USER_INFO_REQUESTED:
    case UPDATE_USER_PROFILE_REQUESTED:
      return { ...state, callback: action?.callback, loading: true };
    case GET_USER_REFER_REQUESTED:
      return { ...state, userRefer: { ...state?.userRefer, textSearch: action?.payload } };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action?.payload?.data?.result },
        errors: [action?.payload?.message],
      };
    case USER_INFO_FAILURE:
      return { ...state, loading: false, errors: [action.payload.error] };
    case SET_DATA_USER_INFO:
      return {
        ...state,
        userInfo: { ...state?.userInfo },
      };
    case ON_REVOKE_INVITE:
      return { ...state, invokeInvite: action?.payload };
    case SET_USER_PROFILE:
      return { ...state, profile: action?.payload };
    case SET_USER_PROFILE_REFER:
      return { ...state, profile_refer: action?.payload };
    case GET_USER_REFER_SUCCESS:
      return { ...state, userRefer: { ...state.userRefer, data: action?.payload?.data } };
    case GET_USER_REFER_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
      return { ...state, errors: action?.payload?.error };
    case SET_USER_PROFILE_AVATAR:
      return {
        ...state,
        avatar_temp: action?.payload,
        userInfo: { ...state.userInfo, avatar: action?.payload?.uri ?? '' },
      };
    case SET_USER_PROFILE_TEMP:
      return { ...state, profile_temp: action?.payload };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, avatar_temp: null, profile_temp: null, userInfo: { ...state?.userInfo, ...action?.payload } };
    case SET_USER_INDUSTRY: {
      return {
        ...state,
        userInfo: { ...state?.userInfo, ...action?.payload },
      };
    }
    case DELETE_DATA_INDUSTRY: {
      const target: string = action?.payload?.target;
      let industries: string[] = [];
      switch (target) {
        case 'yourIndustries':
          industries = state.userInfo.yourIndustries;
          break;
        case 'partnerIndustries':
          industries = state.userInfo.partnerIndustries;
          break;
        case 'sellToIndustries':
          industries = state.userInfo.sellToIndustries;
          break;
      }
      const dataFilter = filterIndustry(industries, action?.payload);
      return { ...state, userInfo: { ...state?.userInfo, [target]: dataFilter } };
    }
    case GET_INVITE_DATA_SUCCESS:
      return { ...state, invites: action?.payload.data };
    case GET_NETWORK_DATA_SUCCESS:
      return { ...state, networks: action?.payload.data };
    case CHANGE_SELL_ALL_BUSINESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          sellToAllBusiness: action?.payload,
        },
      };
    case GET_ASK_DATA_SUCCESS:
      return { ...state, asks: [...action?.payload.data], askPagination: action?.payload.metadata };
    case GET_ASK_PAGE_DATA_SUCCESS:
      return { ...state, asks: mergeUnique(state.asks, action?.payload.data), askPagination: action?.payload.metadata };
    case REMOVE_SUGGESTION:
      return { ...state, userInfo: { ...state?.userInfo, isSuggest: false } };
    case LOG_OUT_SUCCESS:
      void messaging()
        .unsubscribeFromTopic(state.userInfo.code)
        .then(() => console.log('UnSubscribed to topic!', state.userInfo.code));
      return { ...state, userInfo: defaultUser, networks: [], invites: [], asks: [] };
    default:
      return state;
  }
};

const filterIndustry = (industries: string[], { index, target }: { index: number; target: string }) => {
  if (!target || industries.length === 0) {
    return industries;
  }
  const newIndustries = industries.filter((_: any, i: number) => index !== i);
  return [...newIndustries];
};

export default userReducer;