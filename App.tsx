import React, {useEffect} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

import AppNavigator from '~Root/navigation';
import rootStore from '~Root/store';
import {linking} from '~Root/config';

import codePush from 'react-native-code-push';
import {SocketContext, getSocket} from './src/services/socket/context';
import messaging from '@react-native-firebase/messaging';
import {navigationRef} from '~Root/navigation/RootNavigation';
import NotificationHandler from '~Root/components/NotificationHandler';
import {SheetProvider} from 'react-native-actions-sheet';
import BottomSheet from '~Root/components/BottomSheet';

const onBeforeLift = () => {
  console.log('Before On Lift');
};
const {persistor, store} = rootStore();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
persistor.purge();

const App = () => {
  const [socket, setSocket] = React.useState<any>(null);

  const connectSocket = async () => {
    setSocket(await getSocket());
  };

  const checkPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const checkCodePush = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    codePush.sync({
      updateDialog: {
        title: 'Update available',
        optionalUpdateMessage: 'An update is available. Would you like to install it?',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkPermission();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectSocket();
    if (process.env.NODE_ENV !== 'development') {
      checkCodePush();
    }
    if (Platform.OS === 'ios') {
      checkCodePush();
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      <Provider store={store}>
        <NotificationHandler />
        <PersistGate loading={<ActivityIndicator />} onBeforeLift={onBeforeLift} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef} linking={linking} fallback={<ActivityIndicator />}>
              <SheetProvider>
                <AppNavigator />
                <Toast ref={(ref: any) => Toast.setRef(ref)} />
              </SheetProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </SocketContext.Provider>
  );
};

export default App;
