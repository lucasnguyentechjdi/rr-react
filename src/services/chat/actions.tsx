import {
  GET_ASK_DETAIL_REQUEST,
  GET_CHAT_DATA_REQUESTED,
  GET_CHAT_DATA_SUCCESS,
  GET_MESSAGE_DATA_REQUESTED,
  SEND_MESSAGE_REQUESTED,
  SEND_MESSAGE_SUCCESS,
  UPDATE_CHAT_DATA,
  UPDATE_CHAT_LAST_MESSAGE,
  VIEW_CHAT_DETAIL,
} from './constants';
import {IChat, IMessage} from './types';

export const getUserChatData = (
  search: string,
  page: number,
  limit: number,
  type: string,
  callback?: (res: any) => void,
) => {
  return {
    type: GET_CHAT_DATA_REQUESTED,
    payload: {search, page, limit, type},
    callback,
  };
};

export const viewDetailChat = (chatInfo: IChat | null) => {
  return {
    type: VIEW_CHAT_DETAIL,
    payload: chatInfo,
  };
};

export const getAskDetail = (askCode: string) => {
  return {
    type: GET_ASK_DETAIL_REQUEST,
    payload: askCode,
  };
};

export const getChatMessageData = (chatCode: string, page: number, limit: number) => {
  return {
    type: GET_MESSAGE_DATA_REQUESTED,
    payload: {chatCode, page, limit},
  };
};

export const sendChatMessage = (chatCode: string, message: string, attachments: any, callback: (res: any) => void) => {
  return {
    type: SEND_MESSAGE_REQUESTED,
    payload: {chatCode, message, attachments},
    callback,
  };
};

export const receiveChatMessage = (message: IMessage) => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: message,
  };
};

export const updateLastChatMessage = (code: string, lastMessage: string) => {
  return {
    type: UPDATE_CHAT_LAST_MESSAGE,
    payload: {code, lastMessage},
  };
};

export const updateChatData = (payload: any) => {
  return {
    type: GET_CHAT_DATA_SUCCESS,
    payload,
  };
};
