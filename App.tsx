import 'react-native-gesture-handler';

import {ActivityIndicator, Platform} from 'react-native';
import {BASE_COLORS, linking} from '~Root/config';
import React, {useEffect} from 'react';
import {SocketContext, getSocket} from './src/services/socket/context';
import Toast, {ErrorToast, InfoToast, SuccessToast} from 'react-native-toast-message';

import AppNavigator from '~Root/navigation';
import {NavigationContainer} from '@react-navigation/native';
import NotificationHandler from '~Root/components/NotificationHandler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import {navigationRef} from '~Root/navigation/RootNavigation';
import rootStore from '~Root/store';
import Flurry from 'react-native-flurry-sdk';

const onBeforeLift = () => {
  console.log('Before On Lift');
};
const {persistor, store} = rootStore();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
persistor.purge();

export const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        color: BASE_COLORS.davysGreyColor,
      }}
      text2Style={{
        color: BASE_COLORS.davysGreyColor,
      }}
      onPress={() => Toast.hide()}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        color: BASE_COLORS.davysGreyColor,
      }}
      text2Style={{
        color: BASE_COLORS.davysGreyColor,
      }}
      onPress={() => Toast.hide()}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      text1Style={{
        color: BASE_COLORS.davysGreyColor,
      }}
      text2Style={{
        color: BASE_COLORS.davysGreyColor,
      }}
      onPress={() => Toast.hide()}
    />
  ),
};

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
    // Example to get Flurry versions.
    void Flurry.getVersions().then(versions => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
    });

    // Example to get Flurry Publisher Segmentation.
    void Flurry.getPublisherSegmentation(true).then(segmentations => {
      console.log('Publisher Segmentation: ' + segmentations.segments);
    });
    Flurry.setLogEnabled(true);
    Flurry.setLogLevel(Flurry.LogLevel.VERBOSE);
 
    // Set user preferences.
    Flurry.setAge(36);
    Flurry.setGender(Flurry.Gender.FEMALE);
    Flurry.setReportLocation(true);

    // Set user properties.
    Flurry.UserProperties.set(Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');

    // Log Flurry events.
    Flurry.logEvent('React Native Event');
    Flurry.logEvent('React Native Timed Event', {param: 'true'}, true);
    Flurry.endTimedEvent('React Native Timed Event');

    // Log Flurry standard events.
    Flurry.logStandardEvent(Flurry.Event.APP_ACTIVATED);
    var params = new Map([
                     [Flurry.EventParam.TOTAL_AMOUNT, 34.99],
                     [Flurry.EventParam.SUCCESS, true],
                     [Flurry.EventParam.ITEM_NAME, 'book 1'],
                     ['note', 'This is an awesome book to purchase !!!']
                 ]);
    Flurry.logStandardEvent(Flurry.Event.PURCHASED, params);
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
              <AppNavigator />
              <Toast ref={(ref: any) => Toast.setRef({...ref})} config={toastConfig} />
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </SocketContext.Provider>
  );
};

export default App;
