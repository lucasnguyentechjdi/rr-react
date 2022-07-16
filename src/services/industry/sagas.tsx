import {all, put, takeEvery, call} from 'redux-saga/effects';

import IndustryAPI from './apis';
import {
  GET_INDUSTRY_REQUESTED,
  GET_INDUSTRY_SUCCESS,
  GET_INDUSTRY_FAILURE,
  GET_ALL_INDUSTRIES_REQUESTED,
  GET_ALL_INDUSTRIES_SUCCESS,
  GET_ALL_INDUSTRIES_FAILURE,
} from './constants';
import {
  IActionAllIndustriesRequested,
  IActionAllIndustriesSuccess,
  IActionIndustryRequested,
  IActionIndustrySuccess,
} from './types';

function* getIndustry(payload: IActionIndustryRequested) {
  try {
    const response: IActionIndustrySuccess['payload'] = yield call(IndustryAPI.getIndustry);
    if (response) {
      yield put({type: GET_INDUSTRY_SUCCESS, payload: response});
      payload?.callback({
        error: '',
        ...response,
      });
    } else {
      yield put({type: GET_INDUSTRY_FAILURE, payload: {error: response}});
      payload?.callback({
        error: response,
      });
    }
  } catch (error) {
    yield put({type: GET_INDUSTRY_FAILURE, payload: {error}});
  }
}

function* getAllIndustries(payload: IActionAllIndustriesRequested) {
  try {
    const response: IActionAllIndustriesSuccess['payload'] = yield call(IndustryAPI.getAllIndustries);
    if (response) {
      yield put({type: GET_ALL_INDUSTRIES_SUCCESS, payload: response});
      payload?.callback({
        error: '',
        ...response,
      });
    } else {
      yield put({type: GET_ALL_INDUSTRIES_FAILURE, payload: {error: response}});
      payload?.callback({
        error: response,
      });
    }
  } catch (error) {
    yield put({type: GET_INDUSTRY_FAILURE, payload: {error}});
  }
}

function* watchGetIndustry() {
  yield takeEvery(GET_INDUSTRY_REQUESTED, getIndustry);
}

function* watchGetAllIndustries() {
  yield takeEvery(GET_ALL_INDUSTRIES_REQUESTED, getAllIndustries);
}

export default function* industryWatchers() {
  yield all([watchGetIndustry(), watchGetAllIndustries()]);
}
