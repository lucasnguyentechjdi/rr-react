import {all, put, takeEvery, call} from 'redux-saga/effects';
import i18n from 'i18next';

import {IAsyncCall} from '~Root/types';
import {setToken} from '~Root/services/storage';
import {initAuthSuccess} from '~Root/services/auth/actions';

import ResetPasswordAPI from './apis';
import {ASYNC_RESET_PASSWORD} from './constants';
import {IActionResetPasswordSuccess, IResetPasswordState} from './types';

function* asyncHandler(
  action: IAsyncCall,
  api: (payload: any) => Promise<IResetPasswordState>,
  payload: IActionResetPasswordSuccess,
) {
  try {
    const response: IActionResetPasswordSuccess['payload'] = yield call(api, payload?.payload);
    if (response?.success) {
      yield put({type: action.SUCCESS, payload: response?.data});
      yield call(setToken, response);
      yield put(initAuthSuccess());
      payload?.callback({
        success: true,
        message: i18n.t('login_success'),
      });
    } else {
      yield put({type: action.FAILURE, payload: {error: response.message}});
      payload?.callback({
        success: false,
        message: response.message,
      });
    }
  } catch (error) {
    yield put({type: action.FAILURE, payload: {error: error}});
  }

  return payload;
}

function* sagaAsyncCallGenerator(action: IAsyncCall, api: (payload: any) => Promise<any>) {
  yield takeEvery(action.REQUESTED, asyncHandler, action, api);
}

export default function* resetPasswordWatchers() {
  yield all([sagaAsyncCallGenerator(ASYNC_RESET_PASSWORD, ResetPasswordAPI.handleResetPassword)]);
}
