import {
  CREATE_ASK_FAILURE,
  CREATE_ASK_REQUESTED,
  CREATE_ASK_SUCCESS,
  GET_ASK_BY_REF_ID_FAILURE,
  GET_ASK_BY_REF_ID_REQUESTED,
  GET_ASK_BY_REF_ID_SUCCESS,
  GET_ASK_DROPDOWN_FAILURE,
  GET_ASK_DROPDOWN_REQUESTED,
  GET_ASK_DROPDOWN_SUCCESS,
  GET_ASK_SUBMISSIONS_FAILURE,
  GET_ASK_SUBMISSIONS_REQUESTED,
  GET_ASK_SUBMISSIONS_SUCCESS,
  ON_CHANGE_PURPOSE_OF_ASK_FAILURE,
  ON_CHANGE_PURPOSE_OF_ASK_REQUESTED,
  ON_CHANGE_PURPOSE_OF_ASK_SUCCESS,
  UPDATE_ASK_END_FAILURE,
  UPDATE_ASK_END_REQUESTED,
  UPDATE_ASK_END_SUCCESS,
  UPDATE_ASK_REQUESTED,
} from './constants';
import {
  IActionCreateAskSuccess,
  IActionGetAskByRefIdRequest,
  IActionGetAskSubmissionsRequest,
  IActionGetAskSubmissionsSuccess,
  IActionOnChangePurposeOfAskRequest,
  IActionUpdateAskEndInfo,
  IAskDropDownResponse,
} from './types';
import {all, call, put, takeEvery} from 'redux-saga/effects';

import AskAPI from './apis';
import {IResult} from '../axios/types';

function* changeForm(payload: IActionOnChangePurposeOfAskRequest) {
  try {
    const response: IAskDropDownResponse = yield call(AskAPI.getAskForm, payload?.payload);
    if (response?.data?.structure?.length) {
      response?.data?.structure.filter(x => (x.id = x?.name?.replace(/\s/g, '')));
    }
    yield put({type: ON_CHANGE_PURPOSE_OF_ASK_SUCCESS, payload: {data: response?.data}});
    payload?.callback();
  } catch (error) {
    console.log(error);
    yield put({type: ON_CHANGE_PURPOSE_OF_ASK_FAILURE, payload: error});
  }
}

function* getDataDropDown(payload: any) {
  try {
    const response: IAskDropDownResponse = yield call(AskAPI.getDataDropDown);
    yield put({type: GET_ASK_DROPDOWN_SUCCESS, payload: response?.data});
    if (payload?.callback) {
      payload?.callback();
    }
  } catch (error) {
    console.log(error);
    yield put({type: GET_ASK_DROPDOWN_FAILURE, payload: error});
  }
}

function* createAsk(payload: any) {
  try {
    const response: IActionCreateAskSuccess['payload'] = yield call(AskAPI.createAsk, {
      id: payload?.id,
      ...payload?.payload,
    });
    if (response?.success) {
      yield put({type: CREATE_ASK_SUCCESS, payload: {...response}});
    } else {
      yield put({type: CREATE_ASK_FAILURE, payload: response.message});
    }
    payload?.callback(response);
  } catch (error) {
    yield put({type: CREATE_ASK_FAILURE, payload: error});
    payload?.callback();
  }
}

function* getAskSubmissions(payload: IActionGetAskSubmissionsRequest) {
  try {
    const response: IActionGetAskSubmissionsSuccess['payload'] = yield call(AskAPI.getAskSubmissions, payload?.payload);
    if (response?.success) {
      yield put({type: GET_ASK_SUBMISSIONS_SUCCESS, payload: {...response}});
      payload?.callback();
    } else {
      yield put({type: GET_ASK_SUBMISSIONS_FAILURE, payload: response.message});
    }
  } catch (error) {
    console.log(error);
  }
}

function* getAskByRefId(payload: IActionGetAskByRefIdRequest) {
  try {
    const response: IActionGetAskSubmissionsSuccess['payload'] = yield call(AskAPI.getAskByRefId, payload?.payload);
    if (response.success) {
      yield put({type: GET_ASK_BY_REF_ID_SUCCESS, payload: {...response}});
    } else {
      yield put({type: GET_ASK_BY_REF_ID_FAILURE, payload: response.message});
    }
    payload?.callback(response);
  } catch (error) {
    console.log(error);
  }
}

function* updateAskEndInfo(payload: IActionUpdateAskEndInfo) {
  console.log(payload);
  try {
    const response: IResult = yield call(AskAPI.updateAskEndInfo, payload.code, payload.payload);
    if (response?.success) {
      yield put({type: UPDATE_ASK_END_SUCCESS, payload: {...response}});
    } else {
      yield put({type: UPDATE_ASK_END_FAILURE, payload: response.message});
    }
    payload?.callback(response);
  } catch (error) {
    yield put({type: UPDATE_ASK_END_FAILURE, payload: error});
  }
}

function* updateAsk(payload: any) {
  try {
    const response: IResult = yield call(AskAPI.updateAsk, payload.code, payload.payload);
    payload?.callback(response);
  } catch (error) {
    yield put({type: CREATE_ASK_FAILURE, payload: error});
    payload?.callback();
  }
}

function* watchChangeForm() {
  yield takeEvery(ON_CHANGE_PURPOSE_OF_ASK_REQUESTED, changeForm);
}

function* watchGetDataDropDown() {
  yield takeEvery(GET_ASK_DROPDOWN_REQUESTED, getDataDropDown);
}

function* watchCreateAsk() {
  yield takeEvery(CREATE_ASK_REQUESTED, createAsk);
}

function* watchUpdateAsk() {
  yield takeEvery(UPDATE_ASK_REQUESTED, updateAsk);
}

function* watchGetAskSubmissions() {
  yield takeEvery(GET_ASK_SUBMISSIONS_REQUESTED, getAskSubmissions);
}

function* watchGetAskByRefId() {
  yield takeEvery(GET_ASK_BY_REF_ID_REQUESTED, getAskByRefId);
}

function* watchUpdateAskEndInfo() {
  yield takeEvery(UPDATE_ASK_END_REQUESTED, updateAskEndInfo);
}

export default function* askWatchers() {
  yield all([
    watchChangeForm(),
    watchGetDataDropDown(),
    watchCreateAsk(),
    watchUpdateAsk(),
    watchGetAskSubmissions(),
    watchGetAskByRefId(),
    watchUpdateAskEndInfo(),
  ]);
}
