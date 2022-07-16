// Wherever you build your reducers
import {applyMiddleware, compose, createStore} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import {IGlobalState} from '~Root/types';
import persistReducer from '~Root/reducers';
import {persistStore} from 'redux-persist';
import rootSaga from '~Root/sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = (createLogger as any)();
  const middleware = [sagaMiddleware];

  if (__DEV__) {
    middleware.push(loggerMiddleware);
  }

  const enhancers = [composeWithDevTools(applyMiddleware(...middleware))];

  const store = createStore(persistReducer, compose(...enhancers));

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return {store, persistor};
};
