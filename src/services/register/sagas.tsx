import {
  IActionRegisterRequested,
  IActionRegisterSuccess,
  IActionVerifyCodeRequested,
  IActionVerifyCodeSuccess,
  IActionVerifyOTP,
} from './types';
import {
  REGISTER_FAILURE,
  REGISTER_REQUESTED,
  REGISTER_SUCCESS,
  VERIFY_CODE_FAILURE,
  VERIFY_CODE_REQUESTED,
  VERIFY_CODE_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUESTED,
  VERIFY_OTP_SUCCESS,
} from './constants';
import {all, call, put, takeEvery} from 'redux-saga/effects';

import RegisterAPI from './apis';
import i18n from 'i18next';

function* handleRegister(payload: IActionRegisterRequested) {
  try {
    const response: IActionRegisterSuccess['payload'] = yield call(RegisterAPI.handleRegister, payload?.payload);
    if (response?.success) {
      yield put({
        type: REGISTER_SUCCESS,
        payload: {
          ...response?.data,
          email: payload.payload.email,
          password: payload.payload.password,
        },
      });
      payload?.callback &&
        payload?.callback({
          success: true,
          message: i18n.t('register_success'),
        });
    } else {
      yield put({type: REGISTER_FAILURE, payload: {error: response.message}});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
        });
    }
  } catch (error) {
    yield put({type: REGISTER_FAILURE, payload: {error: error}});
  }
}

function* handleVerifyCode(payload: IActionVerifyCodeRequested) {
  try {
    const response: IActionVerifyCodeSuccess['payload'] = yield call(RegisterAPI.verifyCode, payload?.payload);
    if (response?.success) {
      yield put({type: VERIFY_CODE_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: response.message,
        });
    } else {
      yield put({type: VERIFY_CODE_FAILURE, payload: null});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
        });
    }
  } catch (error) {
    yield put({type: VERIFY_CODE_FAILURE, payload: {error: error}});
  }
}

function* handleVerifyOTP(payload: IActionVerifyOTP) {
  try {
    const response: IActionVerifyCodeSuccess['payload'] = yield call(RegisterAPI.accountVerify, payload?.payload);
    if (response?.success) {
      yield put({type: VERIFY_OTP_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: '',
        });
    } else {
      yield put({type: VERIFY_OTP_FAILURE, payload: {error: response.message}});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
        });
    }
  } catch (error) {
    yield put({type: VERIFY_OTP_FAILURE, payload: {error: error}});
  }
}

function* watchRegister() {
  yield takeEvery(REGISTER_REQUESTED, handleRegister);
}

function* watchVerifyCode() {
  yield takeEvery(VERIFY_CODE_REQUESTED, handleVerifyCode);
}
function* watchVerifyOTP() {
  yield takeEvery(VERIFY_OTP_REQUESTED, handleVerifyOTP);
}

export default function* registerWatchers() {
  yield all([watchRegister(), watchVerifyCode(), watchVerifyOTP()]);
  // yield all([sagaAsyncCallGenerator(ASYNC_REGISTER, RegisterAPI.handleRegister)]);
}
