import {
  CREATE_CHAT,
  CREATE_CHAT_INTRODUCE,
  GET_FEED_REQUESTED,
  SET_INDEX_ASK,
  SET_NETWORK_TO_INTRODUCE,
  SET_QUESTION_FOR_FEED,
  SET_USER_TO_SHARE,
} from './constants';
import {
  IActionCreateChatExternal,
  IActionCreateChatInternal,
  IActionSetIndexAsk,
  IActionSetNetworkToIntroduce,
  IActionSetQuestion,
  IActionSetUserToShare,
  IActionGetFeedRequest
} from './types';

import {IStatus} from '~Root/services/axios/types';

export const getFeed = (payload: IActionGetFeedRequest['payload'],callback:()=>void)=> {
  return {
    type: GET_FEED_REQUESTED,
    payload,
    callback
  };
};

export const setQuestion = (payload: IActionSetQuestion['payload']) => {
  return {
    type: SET_QUESTION_FOR_FEED,
    payload,
  };
};

export const createChatInternal = (
  payload: IActionCreateChatInternal['payload'],
  callback?: (response: IStatus) => void,
) => {
  return {
    type: CREATE_CHAT,
    payload,
    callback,
  };
};

export const createChatExternal = (
  payload: IActionCreateChatExternal['payload'],
  callback?: (response: IStatus) => void,
) => {
  return {
    type: CREATE_CHAT_INTRODUCE,
    payload,
    callback,
  };
};

export const setIndexAsk = (payload: IActionSetIndexAsk['payload']) => {
  return {
    type: SET_INDEX_ASK,
    payload,
  };
};

export const setUserToShare = (payload: IActionSetUserToShare['payload']) => {
  return {
    type: SET_USER_TO_SHARE,
    payload,
  };
};

export const setNetworkToIntroduce = (payload: IActionSetNetworkToIntroduce['payload']) => {
  return {
    type: SET_NETWORK_TO_INTRODUCE,
    payload,
  };
};
