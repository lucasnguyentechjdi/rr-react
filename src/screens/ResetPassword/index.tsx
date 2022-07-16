import * as yup from 'yup';

import {BASE_COLORS, GlobalStyles, MESSAGE, RESET_PASSWORD_FIELDS, RESET_PASSWORD_KEYS} from '~Root/config';
import {Button, HeaderSmallBlue, InputValidateControl, Loading, Paragraph} from '~Root/components';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';

import {AppRoute} from '~Root/navigation/AppRoute';
import {IFormData} from '~Root/services/resetPassword/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserAPI from '~Root/services/user/apis';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.RESET_PASSWORD>;

const ResetPasswordScreen = ({navigation, route}: Props) => {
  const schema = yup.object().shape({
    password: yup.string().min(6).required(MESSAGE.messageRequired('Password')),
    rePassword: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const params = route.params;
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: {errors, isValid},
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  if (!params.email || !params.password) {
    navigation.goBack();
  }

  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const onLogin: SubmitHandler<IFormData> = async (credentials: IFormData) => {
    const result = await UserAPI.verifyForgotPassword(
      params.email,
      params.password,
      credentials.password,
      credentials.rePassword,
    );
    if (!result.success) {
      return Toast.show({
        position: 'bottom',
        type: 'error',
        text1: result.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    navigation.navigate(AppRoute.RESET_PASSWORD_SUCCESS);
  };

  const rulePassword = {
    required: {value: true, message: 'Password is required'},
    minLength: 6,
  };

  const onSubmitEditing = (key: RESET_PASSWORD_KEYS) => {
    setFocus(key);
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue title={t('referreach')} onBack={onBack} isBackButton={true} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={GlobalStyles.scrollViewContentContainer}>
            <View style={[GlobalStyles.flexColumn]}>
              <View style={GlobalStyles.flexColumn}>
                <View style={styles.titleContainer}>
                  <Paragraph h4 textBlack style={GlobalStyles.h3Title} title={t('reset_password')} />
                </View>
                <InputValidateControl
                  label={t('new_password')}
                  secureTextEntry={true}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  errors={errors}
                  control={control}
                  name={RESET_PASSWORD_FIELDS.password}
                  rules={rulePassword}
                  register={register}
                  onSubmitEditing={() => onSubmitEditing(RESET_PASSWORD_KEYS.rePassword)}
                />
                <InputValidateControl
                  label={t('confirm_password')}
                  secureTextEntry={true}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  errors={errors}
                  control={control}
                  name={RESET_PASSWORD_FIELDS.rePassword}
                  rules={rulePassword}
                  register={register}
                />
                <Button
                  title={t('reset_password')}
                  h3
                  textCenter
                  bordered
                  onPress={handleSubmit(onLogin)}
                  containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                  textStyle={styles.h3BoldDefault}
                  disabled={!isValid}
                  bgVerifyColor={BASE_COLORS.oxleyColor}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default ResetPasswordScreen;
