/**
 * @format
 */
import {addPlugin} from 'react-native-flipper';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Flurry from 'react-native-flurry-sdk';

addPlugin({
  getId() {
    return 'ReactNativeExamplePlugin';
  },
  onConnect(connection) {},
  onDisconnect() {},
});

new Flurry.Builder()
  .withCrashReporting(true)
  .withLogLevel(Flurry.LogLevel.DEBUG)
  .withLogEnabled(true)
  .build('CGB4BW5K3TJ656TJZTMX');

AppRegistry.registerComponent(appName, () => App);
