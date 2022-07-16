/**
 * @format
 */
import {addPlugin} from 'react-native-flipper';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

addPlugin({
  getId() {
    return 'ReactNativeExamplePlugin';
  },
  onConnect(connection) {},
  onDisconnect() {},
});
AppRegistry.registerComponent(appName, () => App);
