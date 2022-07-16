import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-toast-message';

import {
  Button,
  HeaderSmallBlue,
  Icon,
  Image,
  InputValidateControl,
  Link,
  Loading,
  Paragraph,
} from '~Root/components';
import { BASE_COLORS, GlobalStyles, INVITE_CODE_KEYS, MESSAGE } from '~Root/config';
import { hideLoading, showLoading } from '~Root/services/loading/actions';

import { adjust } from '~Root/utils';
import { AppRoute } from '~Root/navigation/AppRoute';
import { claimInvite } from '~Root/services/invite';
import { IFormData } from '~Root/services/resetPassword/types';
import { IGlobalState } from '~Root/types';
import { imageUrl } from '~Root/services/upload';
import { IStatus } from '~Root/services/register/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verifyCode } from '~Root/services/register/actions';

import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CODE | AppRoute.CLAIM_CODE> & {
  claimCode?: boolean;
};
const InviteCodeScreen = ({ navigation, route, claimCode = false }: Props) => {
  const schema = yup.object().shape({
    inviteCode: yup
      .string()
      .required(MESSAGE.messageRequired('Invite Code'))
      .min(6, 'Invited Code must be at least 6 characters'),
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { params }: any = route;
  const { inviteInfo } = useSelector((state: IGlobalState) => state.registerState);
  const authState = useSelector((state: IGlobalState) => state.authState);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scanQRScreen, setScanQRScreen] = useState(false);

  useEffect(() => {
    if (!params?.invite_code) return;
    setValue('inviteCode', params.invite_code ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.invite_code]);

  const onNext: SubmitHandler<IFormData> = async (credentials: any) => {
    if (!credentials.inviteCode) {
      return;
    }
    if (success && verifySuccess) {
      navigation.navigate(AppRoute.TABS);
      return;
    }
    if (verifySuccess) {
      dispatch(showLoading());
      const result = await claimInvite(credentials.inviteCode);
      setSuccess(result.success);
      dispatch(hideLoading());
      return;
    }
    if (!verifySuccess) {
      dispatch(showLoading());
      dispatch(
        verifyCode(credentials.inviteCode, (response: IStatus) => {
          dispatch(hideLoading());
          if (!response.success) {
            Toast.show({
              position: 'bottom',
              type: response.success ? 'success' : 'error',
              text1: response.message,
              visibilityTime: 4000,
              autoHide: true,
            });
          }
          if (claimCode) {
            setVerifySuccess(response.success);
            return;
          }

          if (response.success) {
            navigation.navigate(AppRoute.REGISTER, {
              inviteCode: credentials.inviteCode,
            });
          }
        }),
      );
    }
  };

  const rulePassword = {
    required: { value: true, message: 'Invite Code is required' },
  };

  const onBack = () => {
    if (navigation.canGoBack()) {
      if (claimCode && (verifySuccess || success)) {
        setSuccess(false);
        setVerifySuccess(false);
        return;
      }
      navigation.goBack();
      return;
    }
    if (!authState.isLoggedIn) {
      navigation.push(AppRoute.LOGIN);
      return;
    }
    navigation.push(AppRoute.SPLASH);
  };

  const onScanSuccess = (e: { data: string }) => {
    setScanQRScreen(false);
    dispatch(showLoading());
    dispatch(
      verifyCode(e.data, (response: IStatus) => {
        dispatch(hideLoading());
        if (!response.success) {
          Toast.show({
            position: 'bottom',
            type: response.success ? 'success' : 'error',
            text1: response.message,
            visibilityTime: 4000,
            autoHide: true,
          });
        }
        if (claimCode) {
          setVerifySuccess(response.success);
          return;
        }

        if (response.success) {
          navigation.navigate(AppRoute.REGISTER, {
            inviteCode: e.data,
          });
        }
      }),
    );
  };

  if (scanQRScreen) {
    return (
      <View style={[GlobalStyles.flexColumn, GlobalStyles.justifyCenter, GlobalStyles.alignCenter]}>
        <QRCodeScanner
          cameraStyle={styles.qrContainer}
          topViewStyle={styles.qrTopViewStyle}
          onRead={onScanSuccess}
        />
      </View>
    );
  }

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
              contentContainerStyle={[GlobalStyles.scrollViewContentContainer, GlobalStyles.container]}>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
                <View style={styles.titleContainer}>
                  <Paragraph
                    h3
                    textBlack
                    style={GlobalStyles.h3Title}
                    title={claimCode ? t('claim_an_invite') : t('sign_up')}
                  />
                </View>
                {verifySuccess && (
                  <View style={[styles.cardContainer]}>
                    <TouchableOpacity style={[GlobalStyles.avatarContainerSecond, GlobalStyles.mr20]}>
                      {inviteInfo?.user?.avatar ? (
                        <Image source={{ uri: imageUrl(inviteInfo?.user?.avatar) }} style={GlobalStyles.miniAvatar} />
                      ) : (
                        <Icon name='user-circle' size={adjust(30)} color={BASE_COLORS.blackColor} />
                      )}
                    </TouchableOpacity>
                    <View style={[GlobalStyles.flexRow, styles.cardDescription]}>
                      <Paragraph
                        h5
                        bold
                        textBlack
                        title={success ? 'Congrats! You are now a part of ' : 'You are Invited to '}
                      />
                      <Link
                        h5
                        bold
                        textDecoration
                        textSteelBlueColor
                        title={`${inviteInfo?.user?.firstName ?? ''} ${inviteInfo?.user?.lastName ?? ''}`}
                      />
                      <Paragraph h5 bold textBlack title="'s Trust network" />
                    </View>
                  </View>
                )}
                <InputValidateControl
                  label={t('input_invite_code')}
                  styleContainer={styles.styleContainer}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  // selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={INVITE_CODE_KEYS.inviteCode}
                  rules={rulePassword}
                  register={register}
                  autoFocus={true}
                  editable={!(claimCode && verifySuccess)}
                />
                <Button
                  title={verifySuccess ? t('done') : t('confirm')}
                  bordered
                  onPress={handleSubmit(onNext)}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...styles.buttonContainerStyle,
                    ...styles.btn,
                  }}
                  textStyle={styles.h3BoldDefault}
                  disabled={!isValid}
                />
                <Button
                  title={t('scan_qr_code')}
                  bordered
                  onPress={() => setScanQRScreen(true)}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...styles.buttonContainerStyle,
                    ...styles.btn,
                    ...styles.outlineBtn,
                  }}
                  textStyle={styles.textSteelBlueColor}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default InviteCodeScreen;
