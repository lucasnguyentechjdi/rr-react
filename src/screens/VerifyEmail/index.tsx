import {Button, HeaderSmallBlue, Loading, Otp, Paragraph} from '~Root/components';
import React, {useEffect, useRef, useState} from 'react';
import {AppState, ScrollView, View} from 'react-native';
import {onSetProgress, verifyEmailRequest} from '~Root/services/auth/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {GlobalStyles} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {IStatus} from './../../services/register/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RegisterAPI from '~Root/services/register/apis';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {verifyOTP} from '~Root/services/register/actions';
import TimeCountDown from '~Root/components/TimeCountDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VERIFY_EMAIL>;
const VerifyEmailScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const registerState = useSelector((state: IGlobalState) => state.registerState);
  const authState = useSelector((state: IGlobalState) => state.authState);
  const [time, setTime] = useState(0);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const dispatch = useDispatch();
  const [otpCode, setOtpCode] = useState('');

  useEffect(() => {
    if (!otpCode) {
      return;
    }
    verifyCode(otpCode, registerState.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpCode, registerState.email]);

  const resendLink = async () => {
    const response = await RegisterAPI.resendVerifyCode({email: registerState.email});
    Toast.show({
      position: 'bottom',
      type: response.success ? 'success' : 'error',
      text1: response.success ? 'Resend verify code success' : response.message,
      visibilityTime: 4000,
      autoHide: true,
    });
    if (response.success) {
      await AsyncStorage.setItem('verify_code_time', moment().add('4', 'minutes').toISOString());
      dispatch(onSetProgress({progress: 240}));
      dispatch(verifyEmailRequest());
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const verifyCode = (code: string, email: string) => {
    dispatch(
      verifyOTP({email, code}, (response: IStatus) => {
        if (response?.success) {
          navigation.navigate(AppRoute.VERIFIED_EMAIL);
          return;
        }
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: response.message,
          visibilityTime: 4000,
          autoHide: true,
        });
      }),
    );
  };

  useEffect(() => {
    if (appStateVisible !== 'active') return;
    const getCountDown = async () => {
      let time: any = await AsyncStorage.getItem('verify_code_time');
      if (!time) {
        time = 240;
      } else {
        time = moment(time).diff(moment(), 'seconds');
      }
      setTime(time);
    };
    void getCountDown();
  }, [appStateVisible]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue title={t('referreach')} onBack={onBack} isBackButton={true} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView
          style={GlobalStyles.scrollViewWhite}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollViewContentContainer}>
          <View style={[GlobalStyles.flexColumn, styles.content]}>
            <View style={styles.titleContainer}>
              <Paragraph h3 textSteelBlueColor style={styles.h3} title={t('verify_email')} />
            </View>
            <Paragraph h5 textSteelBlueColor textCenter title={t('email_verify')} style={styles.description} />
            <Paragraph h5 textOxleyColor textCenter title={t('input_verification_code')} style={GlobalStyles.mb20} />
            <Otp styleContainer={GlobalStyles.mb30} setOtpCode={setOtpCode} />
            <Paragraph h5 bold textSteelBlueColor textCenter title={t('not_get_email')} style={GlobalStyles.mb20} />
            <Button
              title={t('resend_link')}
              bordered
              h3
              textCenter
              onPress={resendLink}
              containerStyle={styles.buttonContainerStyle}
              disabled={authState.progress > 0}
              textStyle={styles.h3BoldDefault}
            />
            <TimeCountDown time={time} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default VerifyEmailScreen;
