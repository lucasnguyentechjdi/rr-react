import {ASYNC_INITIALIZE_AUTH} from '~Root/services/auth/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IGlobalState} from '~Root/types';
import authReducer from '~Root/services/auth/reducer';
import chatReducer from '~Root/services/chat/reducer';
import {combineReducers} from 'redux';
import contactReducer from '~Root/services/contact/reducer';
import createAskReducer from '~Root/services/ask/reducer';
import feedReducer from '~Root/services/feed/reducer';
import industryReducer from '~Root/services/industry/reducer';
import loadingReducer from '~Root/services/loading/reducer';
import loginReducer from '~Root/services/login/reducer';
import matchesReducer from '~Root/services/matches/reducer';
import {persistReducer} from 'redux-persist';
import registerReducer from '~Root/services/register/reducer';
import userReducer from '~Root/services/user/reducer';
import inviteReducer from '~Root/services/invite/reducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: 'authState',
  storage: AsyncStorage,
  blacklist: ['authState'],
};

const appReducer = combineReducers<IGlobalState>({
  loadingState: loadingReducer,
  loginState: loginReducer,
  authState: authReducer,
  userState: userReducer,
  askState: createAskReducer,
  chatState: chatReducer,
  matchesState: matchesReducer,
  industryState: industryReducer,
  contactState: contactReducer,
  feedState: feedReducer,
  registerState: registerReducer,
  inviteState: inviteReducer,
});

export const rootReducer = (state: IGlobalState | undefined, action: any) => {
  if (action.type === ASYNC_INITIALIZE_AUTH.FAILURE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer<IGlobalState>({...rootPersistConfig, ...authPersistConfig}, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
