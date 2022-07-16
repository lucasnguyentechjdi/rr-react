import {all, takeEvery} from 'redux-saga/effects';
import {CONTACT_REQUESTED} from './constants';
import {IActionContactRequested} from './types';

function* sagaGetContact(payload: IActionContactRequested) {
  console.log('contact');
}
export default function* resetPasswordWatchers() {
  yield all([takeEvery(CONTACT_REQUESTED, sagaGetContact)]);
}
