/* eslint-disable @typescript-eslint/promise-function-async */

import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, PROFILE_FIELDS } from '~Root/config';
import {
  Button,
  InputValidateControl,
  Loading,
  ModalDialog,
  Paragraph,
  ProfileBlock,
  ProfileTemplateSceen,
} from '~Root/components';
import { IAvatar, IProfile, IUserState } from '~Root/services/user/types';
import { Platform, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteUserIndustry, setUserIndustry, updateUserProfileRequest } from '~Root/services/user/actions';
import {
  filterIndustry,
  getAllIndustries,
  hideModal,
  setIndustrySelected,
  showModal,
} from '~Root/services/industry/actions';
import { hideLoading, showLoading } from '~Root/services/loading/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import { IGlobalState } from '~Root/types';
import { IIndustryState } from '~Root/services/industry/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import Toast from 'react-native-toast-message';
import styles from './styles';
import { uploadImage } from '~Root/services/upload';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const schema = yup.object().shape({
  name: yup.string(),
});

const ProfileIndustryScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors, isValid },
  } = useForm<IProfile>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const industryState: IIndustryState = useSelector((state: IGlobalState) => state.industryState);
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState({
    profile: false,
    industry: false,
  });
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    dispatch(filterIndustry(textSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSearch]);

  // target = 1 (Your Industry), 2 (You sell to), 3 (yours partners)
  const handleIndustry = ({ title = `${t('your_industry')}`, target = 'yourIndustries' }) => {
    dispatch(showLoading());
    dispatch(getAllIndustries(userState.userInfo.industries));
    dispatch(getAllIndustries(userState.userInfo.industries));
    if (target === 'yourIndustries') {
      dispatch(setIndustrySelected(userState.userInfo.yourIndustries));
    }
    if (target === 'sellToIndustries') {
      dispatch(setIndustrySelected(userState.userInfo.sellToIndustries));
    }
    if (target === 'partnerIndustries') {
      dispatch(setIndustrySelected(userState.userInfo.partnerIndustries));
    }
    dispatch(hideLoading());
    dispatch(showModal({ title, target }));
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSelect = (item: string) => {
    if (industryState.industrySelected && industryState?.industrySelected.find(x => x === item)) return;
    let data: any = [item];
    if (industryState?.industrySelected?.length > 0) {
      data = [...data, ...industryState?.industrySelected];
    }
    dispatch(setIndustrySelected(data));
  };

  const onAdd = (item: string) => {
    if (industryState.industrySelected && industryState?.industrySelected.find(x => x === item)) return;
    let data: any = [item];
    if (industryState?.industrySelected?.length > 0) {
      data = [...data, ...industryState?.industrySelected];
    }
    dispatch(setIndustrySelected(data));
    dispatch(
      setUserIndustry({
        ...userState?.userInfo,
        industries: [...userState?.userInfo.industries, item],
      }),
    );
    dispatch(getAllIndustries([...userState?.userInfo.industries, item]));
    setTextSearch('');
  };

  const onRemove = (index: number) => {
    const data = industryState?.industrySelected.filter((_, i) => i !== index);
    dispatch(setIndustrySelected(data));
  };

  const onSave = (data: string[]) => {
    switch (industryState?.target) {
      case 'yourIndustries':
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            yourIndustries: data,
          }),
        );
        break;
      case 'sellToIndustries':
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            sellToIndustries: data,
          }),
        );
        break;
      case 'partnerIndustries':
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            partnerIndustries: data,
          }),
        );
        break;
      default:
        break;
    }
    dispatch(hideModal({ title: '', target: null }));
    dispatch(setIndustrySelected(null));
  };

  const onHideModal = () => {
    dispatch(hideModal({ title: '' }));
  };

  const onInputChange = useCallback((text: string) => {
    setTextSearch(text);
  }, []);

  const createFormData = (photo?: IAvatar | null) => {
    const data = new FormData();

    if (photo) {
      data.append('file', {
        name: photo.name,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo?.uri && photo?.uri.replace('file://', '') : photo.uri,
      });
    }

    return data;
  };

  const onDone = async () => {
    const dataForm = createFormData(userState?.avatar_temp);
    const item: any = {};
    const data: any = { ...userState?.profile_temp };

    data.industries = userState?.userInfo?.industries;
    data.yourIndustries = userState?.userInfo?.yourIndustries;
    data.sellToIndustries = userState?.userInfo?.sellToIndustries;
    data.partnerIndustries = userState?.userInfo?.partnerIndustries;
    data.sellToAllBusiness = userState?.userInfo?.sellToAllBusiness;
    data.profileCompleted = true;
    dispatch(showLoading());
    if (userState?.avatar_temp) {
      const avatar = await uploadImage(dataForm);
      if (!avatar.success) {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: avatar.message,
          visibilityTime: 4000,
          autoHide: true,
        });
        dispatch(hideLoading());
        return;
      }
      data.avatar = avatar.data.url;
    }
    item.data = data;
    if (!item) {
      dispatch(hideLoading());
      return;
    }
    dispatch(showLoading());
    dispatch(
      updateUserProfileRequest(item, response => {
        if (response && !response?.success) {
          Toast.show({
            position: 'bottom',
            type: response.success ? 'success' : 'error',
            text1: response.message,
            visibilityTime: 4000,
            autoHide: true,
          });
          dispatch(hideLoading());
          return;
        }
        dispatch(hideLoading());
        navigation.navigate(AppRoute.TABS);
      }),
    );
  };

  const onDelete = ({ index, target }: { index: number; target: string }) => {
    dispatch(deleteUserIndustry({ index, target }));
  };

  return (
    <>
      <ProfileTemplateSceen onBack={onBack}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
          <View style={[GlobalStyles.mb30, styles.titleContainer]}>
            <Paragraph textWhite bold style={styles.headerContainer} title={t('step_setup_profile_2')} />
          </View>
          <Paragraph h2 textBlack textCenter title={t('industry_information')} style={styles.information} />
          <View style={styles.cardContainer}>
            <ProfileBlock
              userInfo={userState?.userInfo}
              onDelete={onDelete}
              edit={true}
              handleIndustry={handleIndustry}
            />
          </View>
          {showEdit?.profile && (
            <InputValidateControl
              label={t('looking_for')}
              placeholder={t('looking_for_placeholder')}
              placeholderTextColor={BASE_COLORS.lightPinkColor}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              inputErrorStyle={!isValid && styles.inputErrorStyle}
              selectionColor={BASE_COLORS.primary}
              errors={errors}
              control={control}
              name={PROFILE_FIELDS.name}
              register={register}
              autoFocus={true}
            />
          )}
          <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
            <Button
              title={t('go_back')}
              bordered
              h3
              textCenter
              onPress={onBack}
              containerStyle={styles.buttonContainerStyle}
              textStyle={styles.h5BoldDefault}
            />
            <Button
              title={t('done')}
              bordered
              h3
              textCenter
              onPress={onDone}
              containerStyle={styles.buttonPrimaryContainerStyle}
              textStyle={styles.h5BoldDefault}
            />
          </View>
        </View>
        {industryState.showModal && (
          <ModalDialog
            isVisible={industryState.showModal}
            dataSelected={industryState?.industrySelected}
            title={industryState?.title}
            data={industryState?.industries}
            onSelect={onSelect}
            onClose={onRemove}
            onSave={onSave}
            onHideModal={onHideModal}
            onInputChange={onInputChange}
            textSearch={textSearch}
            onAdd={onAdd}
          />
        )}
      </ProfileTemplateSceen>
      <Loading />
    </>
  );
};

export default ProfileIndustryScreen;
