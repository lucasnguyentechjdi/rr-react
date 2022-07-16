import {
  CLEAR_PROGRESS,
  INITIALIZE_AUTH_FAILURE,
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUESTED,
  LOG_OUT_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUESTED,
  VERIFY_EMAIL_SUCCESS,
} from './constants';
import {END, EventChannel, eventChannel} from 'redux-saga';
import {IActionInitializeAuthRequested, IAuthState} from './types';
import {all, call, put, select, take, takeEvery} from 'redux-saga/effects';
import {clearToken, getToken} from './../storage/index';

import {IGlobalState} from '~Root/types';
import {onSetProgress} from './actions';

const getAuthState = (state: IGlobalState) => state.authState;
let iv: any;
let chan: EventChannel<number>;

function* countDownFlow(secs: number) {
  return eventChannel<number>(emitter => {
    iv = setInterval(() => {
      secs -= 1;
      if (secs < 0) {
        // this causes the channel to close
        emitter(END);
        clearInterval(iv);
      } else {
        emitter(secs);
      }
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

function* initializeAuth(payload: IActionInitializeAuthRequested['payload']) {
  try {
    const token: string = yield call(getToken);
    if (!token) {
      yield put({type: INITIALIZE_AUTH_FAILURE, payload: {error: 'Error: The token expired'}});
    } else {
      // yield put({type: USER_INFO_REQUESTED});
      // yield delay(1000);
      yield put({type: INITIALIZE_AUTH_SUCCESS, payload: token});
    }
  } catch (error) {
    yield put({type: INITIALIZE_AUTH_FAILURE, payload: error});
  }
}

function* verifyEmail() {
  try {
    // const authState: IAuthState = yield select(getAuthState);
    // chan = yield call(countDownFlow, authState.progress);
    // while (true) {
    //   const seconds: number = yield take(chan);

    //   if (seconds < 240) {
    //     yield put(onSetProgress({progress: seconds}));
    //   }

    //   if (seconds === 0) {
    //     yield put({type: VERIFY_EMAIL_SUCCESS, payload: {error: 'Error'}});
    //   }
    // }
  } catch (error) {
    yield put({type: VERIFY_EMAIL_FAILURE, payload: error});
  }
}

function* clearProgress() {
  yield put(onSetProgress({progress: 0}));
  clearInterval(iv);
  // chan.close();
}

function* handleLogout() {
  try {
    yield call(clearToken);
    yield put({type: LOG_OUT_SUCCESS, token: ''});
  } catch (error) {
    yield put({type: LOG_OUT_FAILURE, payload: error});
  }
}

function* watchInitializeAuth() {
  yield takeEvery(INITIALIZE_AUTH_REQUESTED, initializeAuth);
}

function* watchVerifyEmail() {
  yield takeEvery(VERIFY_EMAIL_REQUESTED, verifyEmail);
}

function* watchClearProgress() {
  yield takeEvery(CLEAR_PROGRESS, clearProgress);
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUESTED, handleLogout);
}

export default function* authWatchers() {
  yield all([watchInitializeAuth(), watchVerifyEmail(), watchClearProgress(), watchLogout()]);
}

// function* watchInitNotes() {
//   yield takeEvery(INIT_NOTE_REQUESTED, sagaInitNotes);
// }

// function* watchCreateNotes() {
//   yield takeEvery(CREATE_NOTE_REQUESTED, sagaCreateNotes);
// }

// function* watchDeleteNotes() {
//   yield takeEvery(DELETE_NOTE_REQUESTED, sagaDeleteNotes);
// }

// function* watchUpdateNotes() {
//   yield takeEvery(UPDATE_NOTE_REQUESTED, sagaUpdateNotes);
// }

// export default function* homeWatchers() {
//   yield all([watchInitNotes(), watchCreateNotes(), watchDeleteNotes(), watchUpdateNotes()]);
// }
