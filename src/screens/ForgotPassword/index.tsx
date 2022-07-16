import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, LOGIN_FIELDS, LOGIN_KEYS, MESSAGE } from '~Root/config';
import { Button, HeaderSmallBlue, InputValidateControl, Link, Loading, Paragraph } from '~Root/components';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppRoute } from '~Root/navigation/AppRoute';
import { IFormData } from '~Root/services/login/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserAPI from '~Root/services/user/apis';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.REGISTER>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const schema = yup.object().shape({
    email: yup.string().required(MESSAGE.messageRequired('Email')).email(MESSAGE.messageInValid('email')),
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
  console.log(MESSAGE.messageRequired('Email'));

  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const onLogin: SubmitHandler<IFormData> = async (credentials: IFormData) => {
    const result = await UserAPI.forgotPassword(credentials.email);
    if (!result.success) {
      return Toast.show({
        position: 'bottom',
        type: 'error',
        text1: result.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    navigation.navigate(AppRoute.RECOVER_PASSWORD, { email: credentials.email });
  };

  const onBack = () => {
    navigation.goBack();
  };

  const ruleEmail = {
    required: { value: true, message: 'Email is required' },
  };

  const onRegister = () => {
    navigation.navigate(AppRoute.INVITE_CODE);
  };

  const onSubmitEditing = () => {
    setFocus(LOGIN_KEYS.password);
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
              <View style={styles.titleContainer}>
                <Paragraph h3 textBlack bold600 title={t('forgot_password')} />
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
              <View style={[GlobalStyles.flexRow, GlobalStyles.mt20]}>
                <Paragraph p title='*' style={styles.textRed} />
                <Paragraph p title={t('reset_password_message')} textBlack />
              </View>
              <Button
                title={t('send_email')}
                h3
                textCenter
                bordered
                onPress={handleSubmit(onLogin)}
                containerStyle={{ ...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle }}
                textStyle={styles.h3BoldDefault}
                disabled={!isValid}
                bgVerifyColor={BASE_COLORS.oxleyColor}
              />
              <View style={[GlobalStyles.flexRow, GlobalStyles.itemCenter, GlobalStyles.mt46]}>
                <Paragraph h4 bold textBlack style={styles.h3Default} title={t('have_an_invite_code')} />
                <Link
                  onPress={onRegister}
                  h4
                  textDecoration
                  bold
                  style={[styles.h3Default, styles.signUpLink]}
                  title={t('sign_up')}
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

export default ForgotPasswordScreen;
