import {
  GET_ASK_DATA,
  GET_ASK_DATA_SUCCESS,
  GET_ASK_PAGE_DATA_SUCCESS,
  GET_INVITE_DATA,
  GET_INVITE_DATA_SUCCESS,
  GET_NETWORK_DATA,
  GET_NETWORK_DATA_SUCCESS,
  GET_USER_REFER_FAILURE,
  GET_USER_REFER_REQUESTED,
  GET_USER_REFER_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUESTED,
  USER_INFO_FAILURE,
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
} from './constants';
import {
  IActionGetUserReferRequested,
  IActionGetUserReferSuccess,
  IActionUpdateUserProfileSuccess,
  IActionUserInfoRequested,
  IActionUserInfoSuccess,
} from './types';
import {all, call, delay, put, takeEvery} from 'redux-saga/effects';

import {IResult} from '../axios/types';
import UserAPI from './apis';
import {clearToken} from '~Root/services/storage';
import {initAuthFailure} from '~Root/services/auth/actions';

function* getUserInfo(payload: IActionUserInfoRequested) {
  try {
    // yield call(clearToken);
    const response: IActionUserInfoSuccess['payload'] = yield call(UserAPI.handleUserInfo);
    if (response?.success) {
      yield put({type: USER_INFO_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          error: '',
          data: response?.data?.result,
        });
    } else {
      yield call(clearToken);
      yield put({type: USER_INFO_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          error: response?.message,
        });

      yield put(initAuthFailure({error: response?.message}));
    }
  } catch (error) {
    yield call(clearToken);
    yield put({type: USER_INFO_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        error: error,
      });
    yield put(initAuthFailure({error: JSON.stringify(error)}));
  }

  return payload;
}

function* getUserRefer(payload: IActionGetUserReferRequested) {
  try {
    yield delay(1000);
    const response: IActionGetUserReferSuccess = yield call(UserAPI.getUserRefer, payload?.payload);
    yield put({type: GET_USER_REFER_SUCCESS, payload: response?.payload});
  } catch (error) {
    yield put({type: GET_USER_REFER_FAILURE, payload: {error: error}});
    payload?.callback && payload?.callback();
  }

  return payload;
}

function* updateUserProfile(payload: any) {
  try {
    const dataPayload: IResult = yield call(UserAPI.updateUserProfile, payload?.payload?.data);
    yield put({type: USER_INFO_REQUESTED, callback: () => {}});
    payload?.callback(dataPayload);
  } catch (error) {
    yield put({type: UPDATE_USER_PROFILE_FAILURE, payload: {error: error}});
    payload?.callback && payload?.callback();
  }

  return payload;
}

function* getUserInviteData(payload: any) {
  try {
    const response: IResult = yield call(UserAPI.getUserInviteData);
    yield put({type: GET_INVITE_DATA_SUCCESS, payload: response});
  } catch (error) {}

  return payload;
}

function* getUserNetworkData(payload: any) {
  try {
    const response: IResult = yield call(UserAPI.getUserNetworkData);
    yield put({type: GET_NETWORK_DATA_SUCCESS, payload: response});
  } catch (error) {}

  return payload;
}

function* getUserAskData(payload: any) {
  try {
    const response: IResult = yield call(UserAPI.getUserAskData, payload.payload);
    if (payload.payload.append) {
      yield put({type: GET_ASK_PAGE_DATA_SUCCESS, payload: response.data});
      return;
    }
    yield put({type: GET_ASK_DATA_SUCCESS, payload: response.data});
  } catch (error) {}

  return payload;
}

function* watchGetUser() {
  yield takeEvery(USER_INFO_REQUESTED, getUserInfo);
}

function* watchGetUserRefer() {
  yield takeEvery(GET_USER_REFER_REQUESTED, getUserRefer);
}

function* watchUpdateUserProfile() {
  yield takeEvery(UPDATE_USER_PROFILE_REQUESTED, updateUserProfile);
}

function* watchGetInviteData() {
  yield takeEvery(GET_INVITE_DATA, getUserInviteData);
}

function* watchGetNetworkData() {
  yield takeEvery(GET_NETWORK_DATA, getUserNetworkData);
}

function* watchGetAskData() {
  yield takeEvery(GET_ASK_DATA, getUserAskData);
}

export default function* userWatchers() {
  yield all([
    watchGetUser(),
    watchGetUserRefer(),
    watchUpdateUserProfile(),
    watchGetInviteData(),
    watchGetNetworkData(),
    watchGetAskData(),
  ]);
}
