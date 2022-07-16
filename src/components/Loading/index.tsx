import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

import {BASE_COLORS} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';

const Loading = () => {
  const {loading} = useSelector((state: IGlobalState) => state.loadingState);
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgBlur} />
      <View style={styles.waitingContainer}>
        <ActivityIndicator animating={true} color={`${BASE_COLORS.whiteColor}`} />
      </View>
    </View>
  );
};

export default Loading;
