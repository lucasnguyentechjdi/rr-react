import {
  ASYNC_LIST_MATCHES,
  GET_CHAT_DATA_REQUESTED,
  GET_CHAT_DATA_SUCCESS,
  GET_MESSAGE_DATA_REQUESTED,
  GET_MESSAGE_DATA_SUCCESS,
  SEND_MESSAGE_REQUESTED,
  GET_PAGE_CHAT_DATA_SUCCESS,
  GET_ASK_DETAIL_REQUEST,
  GET_ASK_DETAIL,
} from './constants';
import {all, call, put, takeEvery} from 'redux-saga/effects';

import ChatAPI from './apis';
import {IAsyncCall} from '~Root/types';
import {IResult} from '../axios/types';
import AskAPI from '../ask/apis';

function* asyncHandler(action: IAsyncCall, api: () => Promise<any>, payload: any) {
  // try {
  //   const response: IActionCreateChatSuccess['payload'] = yield call(api);
  //   if (response) {
  //     yield put({type: action.SUCCESS, payload: response});
  //     payload?.callback({
  //       success: true,
  //       error: '',
  //     });
  //   } else {
  //     yield put({type: action.FAILURE, payload: {error: response}});
  //     payload?.callback({
  //       success: true,
  //       error: '',
  //     });
  //   }
  // } catch (error) {
  //   yield put({type: action.FAILURE, payload: {error: error.message}});
  // }

  return payload;
}

function* getChatData(payload: any) {
  try {
    const response: IResult = yield call(ChatAPI.getUserChatGroupData, payload.payload);
    if (payload.payload.type === 'loadMore') {
      yield put({type: GET_PAGE_CHAT_DATA_SUCCESS, payload: response.data});
      if (payload?.callback) {
        payload?.callback(response);
      }
      return;
    }
    yield put({type: GET_CHAT_DATA_SUCCESS, payload: response.data});
    if (payload?.callback) {
      payload?.callback(response);
    }
  } catch (error) {
    console.log(error);
  }

  return payload;
}

function* getChatMessageData(payload: any) {
  try {
    const response: IResult = yield call(ChatAPI.getChatMessageData, payload.payload);
    yield put({type: GET_MESSAGE_DATA_SUCCESS, payload: response.data});
  } catch (error) {
    console.log(error);
  }

  return payload;
}

function* sendChatMessage(payload: any) {
  try {
    const result: IResult = yield call(ChatAPI.sendChatMessage, payload.payload);
    payload?.callback(result);
  } catch (error) {
    console.log(error);
  }

  return payload;
}

function* getAskDetail(payload: any) {
  try {
    const response: IResult = yield call(AskAPI.getAskByRefId, payload.payload);
    yield put({type: GET_ASK_DETAIL, payload: response.data});
  } catch (error) {
    console.log(error);
  }

  return payload;
}

function* sagaAsyncCallGenerator(action: IAsyncCall, api: () => Promise<any>) {
  yield takeEvery(action.REQUESTED, asyncHandler, action, api);
}

function* watchGetChatData() {
  yield takeEvery(GET_CHAT_DATA_REQUESTED, getChatData);
}

function* watchGetChatMessageData() {
  yield takeEvery(GET_MESSAGE_DATA_REQUESTED, getChatMessageData);
}

function* watchSendChatMessage() {
  yield takeEvery(SEND_MESSAGE_REQUESTED, sendChatMessage);
}

function* watchGetAskDetail() {
  yield takeEvery(GET_ASK_DETAIL_REQUEST, getAskDetail);
}

export default function* chatWatchers() {
  yield all([
    sagaAsyncCallGenerator(ASYNC_LIST_MATCHES, ChatAPI.handleFetchChat),
    watchGetChatData(),
    watchGetChatMessageData(),
    watchSendChatMessage(),
    watchGetAskDetail(),
  ]);
}
