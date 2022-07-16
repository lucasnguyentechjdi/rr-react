import {ActivityIndicator, View} from 'react-native';
import React, {useEffect} from 'react';

import {BASE_COLORS} from '~Root/config';
import GlobalSplashScreen from 'react-native-splash-screen';
import styles from './styles';

const SplashScreen = () => {
  useEffect(() => {
    GlobalSplashScreen.hide();
  });

  return (
    <View style={styles.container}>
      {/* <Image source={IMAGES.splash} style={styles.logo} /> */}
      <View style={styles.waitingContainer}>
        <ActivityIndicator animating={true} color={`${BASE_COLORS.whiteColor}`} />
      </View>
    </View>
  );
};

export default SplashScreen;
