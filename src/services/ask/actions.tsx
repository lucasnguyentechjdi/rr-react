import {
  CREATE_ASK_REQUESTED,
  DESTROY_DATA,
  GET_ASK_BY_REF_ID_REQUESTED,
  GET_ASK_BY_REF_ID_SUCCESS,
  GET_ASK_DROPDOWN_REQUESTED,
  GET_ASK_SUBMISSIONS_REQUESTED,
  ON_CHANGE_PURPOSE_OF_ASK_REQUESTED,
  ON_CHANGE_PURPOSE_OF_ASK_SUCCESS,
  SET_ASK_PREVIEW,
  SET_ASK_SELECTED,
  UPDATE_ASK_END_REQUESTED,
  UPDATE_ASK_REQUESTED,
} from './constants';
import {IActionOnChangePurposeOfAskRequest, IActionUpdateAskEndInfo, IAsk} from './types';

import {IResponse} from '../axios/types';
import moment from 'moment';
import { IAskContent } from '../chat/types';

export const onChangePurposeOfAsk = (payload: IActionOnChangePurposeOfAskRequest['payload'], callback: () => void) => {
  return {
    type: ON_CHANGE_PURPOSE_OF_ASK_REQUESTED,
    payload,
    callback,
  };
};

export const onChangeAskType = (payload: any) => {
  return {
    type: ON_CHANGE_PURPOSE_OF_ASK_SUCCESS,
    payload,
  };
};

export const getAskDropDown = (callback?: () => void) => {
  return {
    type: GET_ASK_DROPDOWN_REQUESTED,
    callback,
  };
};

export const createAsk = (id: number, payload: any, callback: (response: any) => void) => {
  return {
    type: CREATE_ASK_REQUESTED,
    id,
    payload,
    callback,
  };
};

export const updateAsk = (code: string, payload: any, callback: (response: any) => void) => {
  return {
    type: UPDATE_ASK_REQUESTED,
    code,
    payload,
    callback,
  };
};

export const destroyData = () => {
  return {
    type: DESTROY_DATA,
  };
};

export const getAskSubmissions = (payload?: number | null, callback?: () => void) => {
  return {
    type: GET_ASK_SUBMISSIONS_REQUESTED,
    payload,
    callback,
  };
};

export const getAskByRefId = (payload?: string, callback?: (response: IResponse) => void) => {
  return {
    type: GET_ASK_BY_REF_ID_REQUESTED,
    payload,
    callback,
  };
};

export const setAskSelected = (payload: any) => {
  return {
    type: SET_ASK_SELECTED,
    payload,
  };
};

export const setAskPreview = (id: string, payload: any) => {
  return {
    type: SET_ASK_PREVIEW,
    payload: {id, ...payload},
  };
};

export const askTitle = (ask: any) => {
  let info = '';
  if (ask?.content?.info) info = ask.content.info.toString();
  let target = '';
  if (ask?.content?.target) target = ask.content.target.toString();
  let detail = '';
  if (ask?.content?.detail) detail = ask.content.detail.toString();
  return `${target} ${detail} for ${info} `;
};

export const askTitleOneLine = (ask: any) => {
  let target = '';
  if (ask?.content?.target) target = ask.content.target.toString();
  let detail = '';
  if (ask?.content?.detail) detail = ask.content.detail.toString();
  return `${target} ${detail}`;
};

export const askLocation = (ask: any) => {
  if (!ask) return '';
  if (ask?.anywhereInWorld) return 'Anywhere';
  return ask.location;
};

export const checkAskIsEnd = (item: IAsk | IAskContent) => {
  if (item.isEnd) return true;
  if (item.endDate && moment(item.endDate).isBefore(moment())) return true;
  return false;
};

export const updateAskEndInfo = (
  code: string,
  payload: IActionUpdateAskEndInfo['payload'],
  callback: (response: any) => void,
) => {
  return {
    type: UPDATE_ASK_END_REQUESTED,
    code,
    payload,
    callback,
  };
};

export const getAskSuccess = (payload: any) => {
  return {
    type: GET_ASK_BY_REF_ID_SUCCESS,
    payload,
  };
};
