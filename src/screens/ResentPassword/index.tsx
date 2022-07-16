import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, LOGIN_FIELDS, LOGIN_KEYS, MESSAGE } from '~Root/config';
import { Button, HeaderSmallBlue, InputValidateControl, Loading, Paragraph } from '~Root/components';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppRoute } from '~Root/navigation/AppRoute';
import { IFormData } from '~Root/services/login/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserAPI from '~Root/services/user/apis';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.RESENT_PASSWORD>;

const ResentPasswordScreen = ({ navigation, route }: Props) => {
  const schema = yup.object().shape({
    email: yup.string().required(MESSAGE.messageRequired('Email')).email(MESSAGE.messageInValid('email')),
    password: yup.string().required(MESSAGE.messageRequired('Password')),
  });
  const params = route.params;
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  if (!params?.email) {
    navigation.navigate(AppRoute.LOGIN);
  }
  const { t } = useTranslation();

  useEffect(() => {
    if (!params?.email) return;
    setValue('email', params.email ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.email]);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const onSaveChange: SubmitHandler<IFormData> = async (credentials: IFormData) => {
    const result = await UserAPI.verifyForgotPassword(credentials.email, credentials.password);
    if (!result.success) {
      return Toast.show({
        position: 'bottom',
        type: 'error',
        text1: result.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    navigation.navigate(AppRoute.RESET_PASSWORD, { email: credentials.email, password: credentials.password });
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

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue title={t('referreach')} isBackButton={true} onBack={onBack} />

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
                  <Paragraph h3 textBlack style={styles.h3} title={t('reset_password')} />
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
                    title={t('save_changes')}
                    h3
                    textCenter
                    bordered
                    onPress={handleSubmit(onSaveChange)}
                    containerStyle={{ ...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle }}
                    textStyle={styles.h3BoldDefault}
                    disabled={!isValid}
                    bgVerifyColor={BASE_COLORS.oxleyColor}
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

export default ResentPasswordScreen;
