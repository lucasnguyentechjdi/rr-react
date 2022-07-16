import {ActivityIndicator, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {BASE_COLORS} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import styles from './styles';
import {userInfoRequest} from '~Root/services/user/actions';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.APP_CHECK>;

const AppCheckScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IGlobalState) => state.authState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(
        userInfoRequest((item: any) => {
          if (item?.data?.profileCompleted) {
            navigation.navigate(AppRoute.TABS);
          } else {
            navigation.navigate(AppRoute.PROFILE_PERSONAL);
          }
        }),
      );
    }
  }, [dispatch, authState.isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.waitingContainer}>
        <ActivityIndicator animating={true} color={`${BASE_COLORS.blackColor}`} />
      </View>
    </View>
  );
};

export default AppCheckScreen;
