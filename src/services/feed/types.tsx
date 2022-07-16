import {
  CREATE_CHAT,
  GET_FEED_FAILURE,
  GET_FEED_REQUESTED,
  GET_FEED_SUCCESS,
  SET_INDEX_ASK,
  SET_NETWORK_TO_INTRODUCE,
  SET_QUESTION_FOR_FEED,
  SET_USER_TO_SHARE,
} from './constants';

import {IAsk} from '~Root/services/ask/types';
import {INetwork} from '~Root/services/network/types';
import {IUser} from '~Root/services/user/types';

export interface IFeedInfoState {
  parentCode: string;
  userCode: string;
  inviteCode: string;
  user: IUser;
  askData?: IAsk[];
  // status?: number; // 0:pending, 1: active
}

export interface IFeedState {
  errors: string;
  loading: boolean;
  indexAsk: number;
  userToShare: Partial<IUser>;
  randomDataFeed: IRandomDataFeed[];
  infoAsk?: Partial<IRandomDataFeed>;
  networks: INetwork[];
  callback?: () => void;
}

export interface IRandomDataFeed extends IAsk {
  user: IUser;
}

// type Action
export interface IActionGetFeedRequest {
  type: typeof GET_FEED_REQUESTED;
  payload: {
    filter: string;
    from: string;
  };
  callback: () => void;
}
export interface IActionGetFeedSuccess {
  type: typeof GET_FEED_SUCCESS;
  payload: {
    data: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetFeedFailure {
  type: typeof GET_FEED_FAILURE;
  payload: {
    error: string;
  };
}
export interface IActionCreateChatInternal {
  type: typeof CREATE_CHAT;
  payload: {
    askCode: string;
  };
  callback: () => void;
}
export interface IActionCreateChatExternal {
  type: typeof CREATE_CHAT;
  payload: {
    askCode: string;
    responderCode: string;
    responderMessage: string;
    askerMessage: string;
  };
  callback: () => void;
}

export interface IActionSetQuestion {
  type: typeof SET_QUESTION_FOR_FEED;
  payload: IRandomDataFeed;
}

export interface IActionSetIndexAsk {
  type: typeof SET_INDEX_ASK;
  payload: number;
}

export interface IActionSetUserToShare {
  type: typeof SET_USER_TO_SHARE;
  payload: IUser;
}

export interface IActionSetNetworkToIntroduce {
  type: typeof SET_NETWORK_TO_INTRODUCE;
  payload: INetwork[];
}

export type IActionsFeed =
  | IActionGetFeedRequest
  | IActionGetFeedSuccess
  | IActionGetFeedFailure
  | IActionSetQuestion
  | IActionCreateChatInternal
  | IActionCreateChatExternal
  | IActionSetIndexAsk
  | IActionSetUserToShare
  | IActionSetNetworkToIntroduce;
