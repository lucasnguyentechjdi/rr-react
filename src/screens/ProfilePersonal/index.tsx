import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { RootNavigatorParamsList } from '~Root/navigation/config';

import { setUserProfileTemp } from '~Root/services/user/actions';
import { IGlobalState } from '~Root/types';
import { IUserState } from '~Root/services/user/types';
import { AppRoute } from '~Root/navigation/AppRoute';
import { Paragraph, Button, Loading, InputValidateControl, ProfileTemplateSceen } from '~Root/components';
import { BASE_COLORS, GlobalStyles, PROFILE_FIELDS } from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VERIFY_EMAIL>;

const schema = yup.object().shape({
  name: yup.string(),
  title: yup.string(),
  introduction: yup.string(),
});

const ProfilePersonalScreen = ({ navigation, canSkip = false }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState?.userInfo?.firstName && userState?.userInfo?.lastName) {
      setValue('name', `${userState?.userInfo?.firstName} ${userState?.userInfo?.lastName}`);
    }
    setValue('title', userState?.userInfo?.title);
    setValue('introduction', userState?.userInfo?.introduction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState?.userInfo?.firstName, userState?.userInfo?.title, userState?.userInfo?.introduction]);

  const onPress: SubmitHandler<any> = (credentials: any) => {
    if (credentials?.name) {
      const name = credentials?.name.split(' ');
      credentials.firstName = name.shift();
      credentials.lastName = name.join(' ');
      delete credentials.name;
    }
    dispatch(setUserProfileTemp(credentials));
    navigation.navigate(AppRoute.PROFILE_INDUSTRY);
  };

  const onSkip = () => {
    navigation.goBack();
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ProfileTemplateSceen key='personal' onBack={onBack} isBackButton={false}>
      <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
        <View style={[GlobalStyles.mb30, styles.titleContainer]}>
          <Paragraph textWhite bold style={styles.headerContainer} title={t('step_setup_profile_1')} />
        </View>
        <Paragraph h2 textBlack textCenter title={t('personal_information')} style={styles.information} />
        <InputValidateControl
          styleArea={styles.styleArea}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholder={t('name')}
          // selectionColor={BASE_COLORS.blackColor}
          placeholderTextColor={BASE_COLORS.spanishGrayColor}
          control={control}
          name={PROFILE_FIELDS.name}
          register={register}
        />
        <InputValidateControl
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholder={t('professtional_title')}
          // selectionColor={BASE_COLORS.blackColor}
          placeholderTextColor={BASE_COLORS.spanishGrayColor}
          control={control}
          name={PROFILE_FIELDS.title}
          register={register}
        />
        <InputValidateControl
          inputStyle={styles.textAreaStyle}
          labelStyle={styles.labelStyle}
          placeholder={t('briefly')}
          // selectionColor={BASE_COLORS.blackColor}
          placeholderTextColor={BASE_COLORS.spanishGrayColor}
          control={control}
          name={PROFILE_FIELDS.introduction}
          register={register}
          multiline={true}
        />
        <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
          {userState?.userInfo?.profileCompleted && (
            <Button
              title={t('skip')}
              bordered
              h3
              textCenter
              onPress={onSkip}
              containerStyle={styles.buttonContainerStyle}
              textStyle={styles.h5BoldDefault}
            />
          )}
          <Button
            title={t('next')}
            bordered
            h3
            textCenter
            onPress={handleSubmit(onPress)}
            containerStyle={styles.buttonPrimaryContainerStyle}
            textStyle={styles.h5BoldDefault}
          />
        </View>
      </View>
      <Loading />
    </ProfileTemplateSceen>
  );
};

export default ProfilePersonalScreen;
