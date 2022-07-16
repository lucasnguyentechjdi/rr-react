import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import userApi from '~Root/services/user/apis';

import * as inviteActions from './actions';
import * as inviteApi from './index';
import {IResult} from '../axios/types';
import Toast from 'react-native-toast-message';

function* createInvite$(action: ReturnType<typeof inviteActions.createInvite.request>) {
  try {
    const { payload  } = action;
    const response: IResult = yield call(inviteApi.createInvite, payload);
    yield put(inviteActions.createInvite.success(response.data))
  } catch (e) {
    yield put(inviteActions.createInvite.failure(e));
  }
}

function* fetchUserMassInvite$() {
  try {
    const response: IResult = yield call(userApi.getUserInviteData);
    yield put(inviteActions.fetchUserMassInvite.success(response.data))
  } catch (e) {
    yield put(inviteActions.fetchUserMassInvite.failure(e));
  }
}

function* cancelInvite$(action: ReturnType<typeof inviteActions.cancelInvite.request>) {
  try {
    const { payload } = action;
    const response: IResult = yield call(inviteApi.cancelInvite, payload);
    yield put(inviteActions.cancelInvite.success(response))
  } catch (e) {
    yield put(inviteActions.cancelInvite.failure(e));
  }
}

function* cancelInviteSuccess$(action: ReturnType<typeof inviteActions.cancelInvite.success>) {
  const { message, success } = action.payload;
  yield call(
    Toast.show, {
    position: 'bottom',
    type: success ? 'success' : 'error',
    text1: message.toString() || 'Cancel invite successfully!',
    visibilityTime: 4000,
    autoHide: true,
  })
}

export default function* inviteSaga$() {
  yield all([
    takeLatest(getType(inviteActions.createInvite.request), createInvite$),
    takeLatest(getType(inviteActions.fetchUserMassInvite.request), fetchUserMassInvite$),
    takeLatest(getType(inviteActions.cancelInvite.request), cancelInvite$),
    takeLatest(getType(inviteActions.cancelInvite.success), cancelInviteSuccess$),
  ]);
}
