import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, MESSAGE, REGISTER_FIELDS, REGISTER_KEYS } from '~Root/config';
import {
  Button,
  HeaderSmallBlue,
  Icon,
  Image,
  InputIconValidate,
  InputValidateControl,
  Link,
  Loading,
  ModalDialogCommon,
  Paragraph,
} from '~Root/components';
import { IFormData, IStatus } from '~Root/services/register/types';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGlobalState } from '~Root/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { adjust } from '~Root/utils';
import { hideLoading } from '~Root/services/loading/actions';
import { imageUrl } from '~Root/services/upload';
import moment from 'moment';
import { registerRequest } from '~Root/services/register/actions';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

const OUT_APP_FORMAT = 'RR-';
type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const RegisterScreen = ({ navigation, route }: Props) => {
  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().required(MESSAGE.messageRequired('Email')).email(MESSAGE.messageInValid('email')),
    password: yup
      .string()
      .required(MESSAGE.messageRequired('Password'))
      .min(6, 'Password must be at least 6 characters'),
  });
  const { params }: any = route;
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

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(80),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { inviteInfo, email } = useSelector((state: IGlobalState) => state.registerState);

  if (!inviteInfo?.code) {
    navigation.goBack();
  }

  const onRegister: SubmitHandler<IFormData> = (credentials: IFormData) => {
    if (!(credentials.firstName && credentials.lastName && credentials.email && credentials.password)) {
      return;
    }
    if (credentials.email === email) {
      setModalVisible(true);
      return;
    }
    dispatch(
      registerRequest(
        { ...credentials, inviteCode: params.inviteCode, password_confirmation: credentials.password },
        (response: IStatus) => {
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
            setModalVisible(true);
          }
        },
      ),
    );
  };

  const ruleEmail = {
    required: { value: true, message: 'Email is required' },
  };

  const rulePassword = {
    required: { value: true, message: 'Password is required' },
    minLength: 6,
  };

  const onSubmitEditing = (key: REGISTER_KEYS) => {
    setFocus(key);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onIconClick = () => {
    setShowPassword(!showPassword);
  };

  const onHideModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPositive = () => {
    onHideModal();
    void AsyncStorage.setItem('verify_code_time', moment().add('4', 'minutes').toISOString());
    navigation.navigate(AppRoute.VERIFY_EMAIL);
  };

  const checkInviteCode = () => {
    if (!params.inviteCode) {
      return false;
    }
    if (params.inviteCode.includes(OUT_APP_FORMAT)) {
      return true;
    }
    return false;
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
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.flexColumn]}>
              <View style={GlobalStyles.flexColumn}>
                <View style={GlobalStyles.titleContainer}>
                  <Paragraph h3 textBlack style={styles.h3} title={t('sign_up')} />
                </View>
                <View style={[GlobalStyles.flexColumn, styles.cardContainer]}>
                  <TouchableOpacity style={[GlobalStyles.avatarContainerSecond, GlobalStyles.mr20]}>
                    {inviteInfo?.user?.avatar ? (
                      <Image source={{ uri: imageUrl(inviteInfo?.user?.avatar) }} style={GlobalStyles.miniAvatar} />
                    ) : (
                      <Icon name='user-circle' size={adjust(30)} color={BASE_COLORS.blackColor} />
                    )}
                  </TouchableOpacity>
                  {checkInviteCode() ? (
                    <View style={[GlobalStyles.flexRow, styles.cardDescription]}>
                      <Paragraph h5 bold textBlack title='You are Responding to ' />
                      <Link
                        h5
                        bold
                        textDecoration
                        textSteelBlueColor
                        title={`${inviteInfo?.user?.firstName ?? ''} ${inviteInfo?.user?.lastName ?? ''}'s`}
                      />
                      <Paragraph h5 bold textBlack title=' Ask' />
                    </View>
                  ) : (
                    <View style={[GlobalStyles.flexRow, styles.cardDescription]}>
                      <Paragraph h5 bold textBlack title='You are Invited to ' />
                      <Link
                        h5
                        bold
                        textDecoration
                        textSteelBlueColor
                        title={`${inviteInfo?.user?.firstName ?? ''} ${inviteInfo?.user?.lastName ?? ''}`}
                      />
                      <Paragraph h5 bold textBlack title="'s Trust Network" />
                    </View>
                  )}
                </View>
                <InputValidateControl
                  label={t('first_name')}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  // selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={REGISTER_FIELDS.firstName}
                  rules={ruleEmail}
                  register={register}
                  autoFocus={true}
                  onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.lastName)}
                />
                <InputValidateControl
                  label={t('last_name')}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  // selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={REGISTER_FIELDS.lastName}
                  register={register}
                  onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.email)}
                />
                <InputValidateControl
                  label={t('email')}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  // selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={REGISTER_FIELDS.email}
                  register={register}
                  onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.password)}
                  keyboardType='email-address'
                />
                <InputIconValidate
                  showIcon={true}
                  iconName='eye'
                  iconSize={18}
                  iconColor={showPassword ? BASE_COLORS.blackColor : BASE_COLORS.darkGray}
                  iconContainerStyle={styles.iconContainerStyle}
                  onIconClick={onIconClick}
                  label={t('create_password')}
                  secureTextEntry={!showPassword}
                  inputStyleWrapper={styles.inputStyleWrapper}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={REGISTER_FIELDS.password}
                  rules={rulePassword}
                  register={register}
                />
                <Button
                  title={t('sign_up')}
                  bordered
                  onPress={handleSubmit(onRegister)}
                  h3
                  textCenter
                  containerStyle={{ ...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle }}
                  textStyle={styles.h3BoldDefault}
                  disabled={!isValid}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {isModalVisible && (
          <ModalDialogCommon
            isVisible={isModalVisible}
            onHideModal={onHideModal}
            onPositive={onPositive}
            title={t('verify_email')}
            content={t('verification_link')}
            styleModal={GlobalStyles.pb20}
          />
        )}
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default RegisterScreen;
