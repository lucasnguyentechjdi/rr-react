import {all, fork} from 'redux-saga/effects';

import appWatchers from '~Root/services/auth/sagas';
import loginWatchers from '~Root/services/login/sagas';
import registerWatchers from '~Root/services/register/sagas';
import userWatchers from '~Root/services/user/sagas';
import createAskWatchers from '~Root/services/ask/sagas';
import chatWatchers from '~Root/services/chat/sagas';
import matchesWatchers from '~Root/services/matches/sagas';
import feedWatchers from '~Root/services/feed/sagas';
import industryWatchers from '~Root/services/industry/sagas';

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
}
