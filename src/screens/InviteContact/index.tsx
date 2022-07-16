import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, INVITE_CONTACT_FIELDS, MESSAGE } from '~Root/config';
import {
  Button,
  InputValidateControl,
  InviteContactItems,
  InviteContactTemplateScreen,
  Link,
  Loading,
  Paragraph,
  TabGroup,
  Tab,
} from '~Root/components';
import React, { useEffect, useRef, useState } from 'react';
import { Share, View, Text } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import { IGlobalState } from '~Root/types';
import { IInviteFormData, ENetworkInvite } from '~Root/services/invite/types';
import { IUserState } from '~Root/services/user/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import Toast from 'react-native-toast-message';
import { clearContactSelected } from '~Root/services/contact/actions';
import { createInvite, requestIncreaseInvite } from '~Root/services/invite';
import { getUserInviteData, userInfoRequest } from '~Root/services/user/actions';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { buildShareInviteLink } from '~Root/utils/link';
import MassInvite from '../MassInvite';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONTACT>;

const InviteContactScreen = ({ navigation }: Props) => {
  const schema = yup.object().shape({
    name: yup.string().required(MESSAGE.messageRequired('Name')),
    email: yup.string().required(MESSAGE.messageRequired('Email')).email(MESSAGE.messageInValid('email')),
    phoneNumber: yup.string().required(MESSAGE.messageRequired('Phone Number')),
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    control,
    setValue: setFormValue,
    getValues: getFormValues,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IInviteFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState('');
  const [inviteComplete, setInviteComplete] = useState(false);
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const { contactSelected } = useSelector((state: IGlobalState) => state.contactState);

  const onScan = () => {
    dispatch(clearContactSelected());
    navigation.navigate(AppRoute.LIST_CONTACT);
  };

  const phoneChangeText = (text: string) => {
    if (!phoneInput.current?.isValidNumber(value) && value !== '') {
      setError('phoneNumber', {
        type: 'manual',
        message: 'Phone is invalid',
      });
    }
    clearErrors('phoneNumber');
    setFormValue('countryCode', phoneInput.current?.getCountryCode() ?? '');
    setFormValue('phoneNumber', text);
  };

  const onShare: SubmitHandler<IInviteFormData> = async (credentials: IInviteFormData) => {
    if (checkInviteLeft() === 0) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('invite_contact', { count: checkInviteLeft(), left: userState.userInfo.inviteMax }),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    const result = await createInvite(credentials);
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('create_invite_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      setInviteComplete(true);
      dispatch(getUserInviteData());
      const code: string = result.data?.secretCode ?? '';
      await Share.share({
        message: await buildLink(code),
      });
    }
  };

  const buildLink = async (code: string) => {
    return await buildShareInviteLink(code);
  };

  const onBack = () => {
    navigation.goBack();
    dispatch(clearContactSelected());
  };

  const backToNetwork = () => {
    navigation.goBack();
  };

  const ruleEmail = {
    required: { value: true, message: 'Email is required' },
  };

  const ruleName = {
    required: { value: true, message: 'Name is required' },
  };

  const checkInviteLeft = () => {
    if (userState.invites.length >= userState.userInfo.inviteMax) {
      return 0;
    }
    return userState.userInfo.inviteMax - userState.invites.length;
  };

  const onRequestMoreInvite = async () => {
    const result = await requestIncreaseInvite();
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('send_request_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      dispatch(userInfoRequest());
    }
  };

  useEffect(() => {
    if (contactSelected) {
      setFormValue('name', contactSelected.name);
      setFormValue('email', contactSelected.email ?? '');
      setFormValue('phoneNumber', contactSelected.phoneNumber ?? '');
      phoneInput.current?.setState({ number: contactSelected.phoneNumber ?? '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactSelected]);

  useEffect(() => {
    if (checkInviteLeft() === 0) {
      navigation.replace(AppRoute.INVITE_REQUEST);
    }
  }, []);

  const [tabValue, setTabValue] = React.useState(ENetworkInvite.Individual);
  const handleOnChangeTab = (ind: number) => {
    setTabValue(ind ? ENetworkInvite.MassInvite : ENetworkInvite.Individual)
  }

  return (
    <InviteContactTemplateScreen
      title={`${t('invite_into')} ${t('trust_network')}`}
      onBack={onBack}
      isBackButton={true}>
      <View style={[styles.tabGroup]}>
        <TabGroup titles={['Individual Invite', 'Mass Invite']} value={tabValue} onChange={handleOnChangeTab}>
          <Tab tabVal={ENetworkInvite.Individual}>
            <View style={[GlobalStyles.scrollViewWhite, GlobalStyles.flexColumn]}>
              <Button
                title={t('scan_phone')}
                textCenter
                bordered
                onPress={onScan}
                containerStyle={[styles.buttonCreateInviteContainerStyle, GlobalStyles.mv10]}
                textStyle={styles.h3BoldDefault}
              />
              <View style={[GlobalStyles.mb15, styles.line]} />
              {!inviteComplete && (
                <>
                  <InputValidateControl
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    autoFocus={false}
                    selectionColor={BASE_COLORS.steelBlueColor}
                    placeholder={t('name')}
                    placeholderTextColor={BASE_COLORS.steelBlueColor}
                    errors={errors}
                    control={control}
                    name={INVITE_CONTACT_FIELDS.name}
                    rules={ruleName}
                    register={register}
                    autoCapitalize='none'
                    autoCorrect={false}
                  />
                  <InputValidateControl
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.steelBlueColor}
                    placeholder={t('email')}
                    placeholderTextColor={BASE_COLORS.steelBlueColor}
                    errors={errors}
                    control={control}
                    name={INVITE_CONTACT_FIELDS.email}
                    rules={ruleEmail}
                    register={register}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={false}
                    keyboardType='email-address'
                  />
                </>
              )}
              <View style={[GlobalStyles.mv10]} />
              {checkInviteLeft() === 0 && (
                <Link
                  onPress={onRequestMoreInvite}
                  h3
                  bold
                  style={[GlobalStyles.mv10, styles.link]}
                  title={t('request_invite')}
                />
              )}
              {inviteComplete ? (
                <Button
                  title={t('done')}
                  textCenter
                  bordered
                  onPress={backToNetwork}
                  containerStyle={styles.buttonCreateInviteContainerStyle}
                  textStyle={styles.h3BoldDefault}
                />
              ) : (
                  <Button
                    title={t('share_invite')}
                    textCenter
                    bordered
                    onPress={handleSubmit(onShare)}
                    containerStyle={styles.buttonCreateInviteContainerStyle}
                    textStyle={styles.h3BoldDefault}
                  />
                )}
            </View>
            {inviteComplete && (
              <View style={styles.listContainer}>
                <InviteContactItems data={userState.invites} />
              </View>
            )}

            <Loading />
          </Tab>
          <Tab tabVal={ENetworkInvite.MassInvite}>
            <MassInvite navigation={navigation}/>
          </Tab>
        </TabGroup>
      </View>
    </InviteContactTemplateScreen>
  );
};

export default InviteContactScreen;
