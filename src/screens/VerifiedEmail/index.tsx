import {Button, HeaderSmallBlue, Loading, Paragraph} from '~Root/components';
import {ScrollView, View} from 'react-native';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {GlobalStyles} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {loginRequest} from '~Root/services/login/actions';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {onClearProgress} from '~Root/services/auth/actions';
import ChatAPI from '~Root/services/chat/apis';
import {getSocket, SocketContext} from '~Root/services/socket/context';
import Flurry from 'react-native-flurry-sdk';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VERIFY_EMAIL>;

const VerifiedEmailScreen = ({navigation}: Props) => {
  const registerState = useSelector((state: IGlobalState) => state.registerState);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {setSocket} = useContext(SocketContext);

  const reInitSocket = async () => {
    setSocket(await getSocket());
  };

  const onPress = () => {
    dispatch(showLoading());
    dispatch(
      loginRequest(
        {email: registerState.email, password: registerState.password, grant_type: 'password'},
        async (response: any) => {
          if (!response) {
            return;
          }
          dispatch(hideLoading());
          Toast.show({
            position: 'bottom',
            type: response.success ? 'success' : 'error',
            text1: response.message,
            visibilityTime: 4000,
            autoHide: true,
          });
          if (response.success) {
            dispatch(onClearProgress({progress: 0}));
            if (response.data.inviteByAskCode) {
              const result = await ChatAPI.createChatByShare(response.data.inviteByAskCode);
              Flurry.logEvent('Create_Chat', {
                code: result.data.code,
                type: 'share',
              });
            }
            navigation.navigate(AppRoute.PROFILE_PERSONAL);
            void reInitSocket();
          }
        },
      ),
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue title={t('referreach')} onBack={onBack} isBackButton={true} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView
          style={GlobalStyles.scrollViewWhite}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollViewContentContainer}>
          <View style={[GlobalStyles.flexColumn, styles.content]}>
            <View style={styles.titleContainer}>
              <Paragraph h3 bold textBlack style={styles.h3} title={t('email_verified')} />
            </View>
            <Paragraph h5 textBlack textCenter title={t('register_complete')} style={styles.description} />
            <Button
              title={t('setup_profile')}
              bordered
              h3
              textCenter
              onPress={onPress}
              containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
              textStyle={styles.h3BoldDefault}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default VerifiedEmailScreen;
