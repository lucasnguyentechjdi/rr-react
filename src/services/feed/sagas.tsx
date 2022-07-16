import {
  CREATE_CHAT,
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_INTRODUCE,
  CREATE_CHAT_INTRODUCE_FAILURE,
  CREATE_CHAT_INTRODUCE_SUCCESS,
  CREATE_CHAT_SUCCESS,
  GET_FEED_FAILURE,
  GET_FEED_REQUESTED,
  GET_FEED_SUCCESS,
} from './constants';
import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import FeedAPI from './apis';
import {IActionGetFeedRequest} from './types';
import {IGlobalState} from '~Root/types';
import {INetwork} from '~Root/services/network/types';
import {IResult} from '../axios/types';
import {IUserState} from '~Root/services/user/types';
import Flurry from 'react-native-flurry-sdk';

const getUserState = (state: IGlobalState) => state.userState;

function* getFeed(payload: any) {
  try {

    const response: IResult = yield call(FeedAPI.getAskInNetWork, payload?.payload);
    const userState: IUserState = yield select(getUserState);
    const randomDataFeed = response.data?.data;
    let networks: INetwork[] = [];
    if (randomDataFeed.length > 0) {
      networks = userState.networks.filter(item => item.user?.code !== randomDataFeed[0].userCode);
    }
    // shuffle(randomDataFeed);
    yield put({
      type: GET_FEED_SUCCESS,
      payload: {randomDataFeed, networks},
    });
    payload?.callback();
  } catch (error) {
    console.log(error);
    yield put({type: GET_FEED_FAILURE, payload: error});
  }
}

function* createChatInternal(payload: any) {
  try {
    const response: IResult = yield call(FeedAPI.createChatInNetwork, payload?.payload);
    if (response?.success) {
      yield put({type: CREATE_CHAT_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: response.message,
          data: response.data,
        });
      Flurry.logEvent('Create_Chat', {
        code: response.data.code,
        type: 'network',
      });
    } else {
      yield put({type: CREATE_CHAT_FAILURE, payload: null});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
          data: false,
        });
    }
  } catch (error) {
    console.log(error);
    yield put({type: CREATE_CHAT_FAILURE, payload: error});
  }
}

function* createChatIntroduce(payload: any) {
  try {
    const response: IResult = yield call(FeedAPI.createChatForIntroduce, payload?.payload);
    if (response?.success) {
      yield put({type: CREATE_CHAT_INTRODUCE_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: response.message,
        });
      Flurry.logEvent('Create_Chat', {
        code: response.data.code,
        type: 'introduce',
      });
    } else {
      yield put({type: CREATE_CHAT_INTRODUCE_FAILURE, payload: null});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
        });
    }
  } catch (error) {
    console.log(error);
    yield put({type: CREATE_CHAT_INTRODUCE_FAILURE, payload: error});
  }
}

function* watchGetFeed() {
  yield takeEvery(GET_FEED_REQUESTED, getFeed);
}

function* watchCreateChatInternal() {
  yield takeEvery(CREATE_CHAT, createChatInternal);
}

function* watchCreateChatIntroduce() {
  yield takeEvery(CREATE_CHAT_INTRODUCE, createChatIntroduce);
}

export default function* feedWatchers() {
  yield all([watchGetFeed(), watchCreateChatInternal(), watchCreateChatIntroduce()]);
}
