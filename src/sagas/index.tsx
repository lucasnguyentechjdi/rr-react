import {all, fork} from 'redux-saga/effects';

import appWatchers from '~Root/services/auth/sagas';
import chatWatchers from '~Root/services/chat/sagas';
import createAskWatchers from '~Root/services/ask/sagas';
import feedWatchers from '~Root/services/feed/sagas';
import industryWatchers from '~Root/services/industry/sagas';
import inviteSaga$ from '~Root/services/invite/sagas';
import loginWatchers from '~Root/services/login/sagas';
import matchesWatchers from '~Root/services/matches/sagas';
import registerWatchers from '~Root/services/register/sagas';
import userWatchers from '~Root/services/user/sagas';

export default function* rootSaga() {
  yield all([fork(appWatchers)]);
  yield all([fork(loginWatchers)]);
  yield all([fork(registerWatchers)]);
  yield all([fork(userWatchers)]);
  yield all([fork(createAskWatchers)]);
  yield all([fork(chatWatchers)]);
  yield all([fork(matchesWatchers)]);
  yield all([fork(feedWatchers)]);
  yield all([fork(industryWatchers)]);
  yield all([fork(inviteSaga$)]);
}
