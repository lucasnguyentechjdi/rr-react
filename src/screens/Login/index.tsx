import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, LOGIN_FIELDS, LOGIN_KEYS, MESSAGE } from '~Root/config';
import { Button, HeaderSmallBlue, InputValidateControl, Link, Loading, Paragraph } from '~Root/components';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import React, { useContext } from 'react';
import { SocketContext, getSocket } from '~Root/services/socket/context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { hideLoading, showLoading } from '~Root/services/loading/actions';

import { AppRoute } from '~Root/navigation/AppRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFormData } from '~Root/services/login/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RegisterAPI from '~Root/services/register/apis';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { loginRequest } from '~Root/services/login/actions';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import { registerSuccess } from '~Root/services/register/actions';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import UserAPI from '~Root/services/user/apis';
import Flurry from 'react-native-flurry-sdk';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const LoginScreen = ({ navigation }: Props) => {
  const schema = yup.object().shape({
    email: yup.string().required(MESSAGE.messageRequired('Email')).email(MESSAGE.messageInValid('email')),
    password: yup.string().required(MESSAGE.messageRequired('Password')),
  });
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const type = "register"
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSocket } = useContext(SocketContext);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const reInitSocket = async () => {
    setSocket(await getSocket());
  };

  const onLogin: SubmitHandler<IFormData> = (credentials: IFormData) => {
    if (credentials.email && credentials.password) {
      dispatch(showLoading());
      dispatch(
        loginRequest(
          { email: credentials.email, password: credentials.password, grant_type: 'password' },
          async (response: any) => {
            if (response) {
              dispatch(hideLoading());
              Toast.show({
                position: 'bottom',
                type: response.success ? 'success' : 'error',
                text1: response.message,
                visibilityTime: 4000,
                autoHide: true,
              });
            }
            if (!response.success && response.data === 'verify') {
              void verifyEmailHandle(credentials);
              return;
            }
            if (response.success) {
              // void analytics().logEvent('login', response.data);
              void UserAPI.trackingUserActivity('login', {
                code: response.data.code,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
              });
              Flurry.logEvent('login', {
                code: response.data.code,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
              });
              void reInitSocket();
            }
          },
        ),
      );
    }
  };

  const verifyEmailHandle = async (credentials: any) => {
    const result = await RegisterAPI.resendVerifyCode({ email: credentials.email });
    if (result.success) {
      Toast.show({
        position: 'bottom',
        type: result.success ? 'success' : 'error',
        text1: result.success ? 'Resend verify code success' : result.message,
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    if (!result.success && result.data === 'delay' && result.message) {
      await AsyncStorage.setItem('verify_code_time', result.message);
      dispatch(registerSuccess(credentials.email, credentials.password));
      navigation.navigate(AppRoute.VERIFY_EMAIL);
      return;
    }
    await AsyncStorage.setItem('verify_code_time', moment().add('4', 'minutes').toISOString());
    dispatch(registerSuccess(credentials.email, credentials.password));
    navigation.navigate(AppRoute.VERIFY_EMAIL);
  };

  const ruleEmail = {
    required: { value: true, message: 'Email is required' },
  };

  const rulePassword = {
    required: { value: true, message: 'Password is required' },
  };

  const onSubmitEditing = () => {
    setFocus(LOGIN_KEYS.password);
  };

  const onRegister = () => {
    // navigation.navigate(AppRoute.INVITE_CODE);
    navigation.navigate(AppRoute.PRIVACY, {type : type});
  };

  const onForgotPassword = () => {
    navigation.navigate(AppRoute.FORGOT_PASSWORD);
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue title={t('referreach')} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={GlobalStyles.flexColumn}>
              <View style={GlobalStyles.flexColumn}>
                <View style={GlobalStyles.titleContainer}>
                  <Paragraph h3 textBlack style={styles.h3} title={t('welcome')} />
                </View>
                <InputValidateControl
                  label={t('email')}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  // selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={LOGIN_FIELDS.email}
                  rules={ruleEmail}
                  register={register}
                  autoFocus={true}
                  onSubmitEditing={onSubmitEditing}
                  keyboardType='email-address'
                />
                <InputValidateControl
                  label={t('password')}
                  secureTextEntry={true}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  // selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={LOGIN_FIELDS.password}
                  rules={rulePassword}
                  register={register}
                />
                <View style={GlobalStyles.mt30}>
                  <Button
                    title='Log in'
                    h3
                    textCenter
                    bordered
                    onPress={handleSubmit(onLogin)}
                    containerStyle={{ ...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle }}
                    textStyle={styles.h3BoldDefault}
                    disabled={!isValid}
                  />
                </View>
              </View>
              <View style={[GlobalStyles.flexColumn, styles.signUpArea]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.itemCenter, GlobalStyles.mb30]}>
                  <Paragraph h4 bold textBlack style={styles.h3Default} title={t('have_an_invite_code')} />
                  <Link
                    onPress={onRegister}
                    h4
                    textBlack
                    textDecoration
                    bold
                    style={[styles.h3Default, styles.signUpLink]}
                    title={t('sign_up')}
                  />
                </View>
                <View style={[GlobalStyles.flexRow, GlobalStyles.itemCenter]}>
                  <Link
                    onPress={onForgotPassword}
                    h4
                    textBlack
                    textDecoration
                    style={styles.h3Default}
                    title={t('forgot_password')}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default LoginScreen;
