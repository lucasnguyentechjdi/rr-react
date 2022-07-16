import * as yup from 'yup';

import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonSecond,
  InputValidateControl,
  Loading,
  ModalDialog,
  ModalDialogCommon,
  Paragraph,
  ProfileBlock,
  ProfileTemplateSceen
} from '~Root/components';
import { BASE_COLORS, GlobalStyles, PROFILE_FIELDS } from '~Root/config';
import {
  filterIndustry,
  getAllIndustries,
  hideModal,
  setIndustrySelected,
  showModal
} from '~Root/services/industry/actions';
import { IIndustry, IIndustryState } from '~Root/services/industry/types';
import { hideLoading, showLoading } from '~Root/services/loading/actions';
import { onLogout, setUserIndustry, updateUserProfileRequest } from '~Root/services/user/actions';
import { IAvatar, IUserState } from '~Root/services/user/types';

import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { AppRoute } from '~Root/navigation/AppRoute';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { destroyData } from '~Root/services/ask/actions';
import { logout } from '~Root/services/auth/actions';
import { socketDestroy } from '~Root/services/socket/context';
import { uploadImage } from '~Root/services/upload';
import { IGlobalState } from '~Root/types';
import Chat from './icon/Chat';
import EditIcon from './icon/EditIcon';
import Email from './icon/Email';
import Question from './icon/Question';
import Shield from './icon/Shield';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const schema = yup.object().shape({
  name: yup.string(),
  title: yup.string(),
  introduction: yup.string(),
});

const ProfileScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const PrimeUserState = useSelector((state: IGlobalState) => state.userState);
  const industryState: IIndustryState = useSelector((state: IGlobalState) => state.industryState);
  const dispatch = useDispatch();

  const [userState, setUserState] = useState<IUserState>(PrimeUserState);
  const [showEdit, setShowEdit] = useState({
    profile: false,
    industry: false,
  });
  const [textSearch, setTextSearch] = useState('');
  const [modalLogout, setModalLogout] = useState(false);

  useEffect(() => {
    dispatch(filterIndustry(textSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSearch]);

  // target = 1 (Your Industry), 2 (You sell to), 3 (yours partners)
  const handleIndustry = ({ title = `${t('your_industry')}`, target = 'yourIndustries' }) => {
    dispatch(showLoading());
    if (target === 'yourIndustries' && userState.userInfo.yourIndustries) {
      dispatch(setIndustrySelected(userState.userInfo.yourIndustries));
      dispatch(
        getAllIndustries(
          userState.userInfo.industries.filter((item: string) => !userState.userInfo.yourIndustries.includes(item)),
        ),
      );
    }
    if (target === 'sellToIndustries' && userState.userInfo.sellToIndustries) {
      dispatch(setIndustrySelected(userState.userInfo.sellToIndustries));
      dispatch(
        getAllIndustries(
          userState.userInfo.industries.filter((item: string) => !userState.userInfo.sellToIndustries.includes(item)),
        ),
      );
    }
    if (target === 'partnerIndustries' && userState.userInfo.partnerIndustries) {
      dispatch(setIndustrySelected(userState.userInfo.partnerIndustries));
      dispatch(
        getAllIndustries(
          userState.userInfo.industries.filter((item: string) => !userState.userInfo.partnerIndustries.includes(item)),
        ),
      );
    }
    dispatch(hideLoading());
    dispatch(showModal({ title, target }));
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSelect = (item: IIndustry | string) => {
    if (industryState.industrySelected?.find(x => x === item)) return;
    let data: any = [item];
    if (industryState?.industrySelected?.length > 0) {
      data = [...data, ...industryState?.industrySelected];
    }
    dispatch(setIndustrySelected(data));
  };

  const onAdd = (item: string) => {
    if (industryState.industrySelected.find(x => x === item)) return;
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
    // switch (industryState?.target) {
    //   case 'yourIndustries':
    //     dispatch(
    //       setUserIndustry({
    //         ...userState?.userInfo,
    //         yourIndustries: data,
    //       }),
    //     );
    //     break;
    //   case 'sellToIndustries':
    //     dispatch(
    //       setUserIndustry({
    //         ...userState?.userInfo,
    //         sellToIndustries: data,
    //       }),
    //     );
    //     break;
    //   case 'partnerIndustries':
    //     dispatch(
    //       setUserIndustry({
    //         ...userState?.userInfo,
    //         partnerIndustries: data,
    //       }),
    //     );
    //     break;
    //   default:
    //     break;
    // }
    switch (industryState?.target) {
      case 'yourIndustries': {
        setUserState({
          ...userState,
          userInfo: { ...userState?.userInfo, yourIndustries: data },
        })
        break;
      }
      case 'sellToIndustries': {
        setUserState({
          ...userState,
          userInfo: { ...userState?.userInfo, sellToIndustries: data },
        })
        break;
      }
      case 'partnerIndustries': {
        setUserState({
          ...userState,
          userInfo: { ...userState?.userInfo, partnerIndustries: data },
        })
        break;
      }
      default:
        break;
    }
    dispatch(hideModal({ title: '', target: null }));
    dispatch(setIndustrySelected(null));
  };

  const onHideModal = () => {
    dispatch(hideModal({ title: '', target: null }));
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

  const onDone: SubmitHandler<any> = async (credentials: any) => {
    const dataForm = createFormData(userState?.avatar_temp);
    const item: any = {};
    const data: any = { ...userState?.profile_temp };
    const nameData = credentials.name.split(' ');
    const firstName = nameData.splice(0, 1);
    data.firstName = firstName[0];
    data.lastName = nameData.length > 0 ? nameData.join(' ') : '';
    data.title = credentials.title;
    data.introduction = credentials.introduction;
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
    dispatch(
      updateUserProfileRequest(item, response => {
        if (!response.success) {
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

  const onPressPolicy = () => {
    console.log('onPressPolicy');
    navigation.navigate(AppRoute.PRIVACY, { type: 'profile' });
  }

  const onCancel = () => {
    if (!userState?.userInfo?.profileCompleted) {
      return false;
    }
    if (showEdit?.profile) {
      setShowEdit(value => ({ ...value, profile: false }));
      setUserState(PrimeUserState);
      return false;
    }

    navigation.navigate(AppRoute.YOUR_ASKS);
  };

  const onPress = () => {
    setShowEdit(value => ({ ...value, profile: true }));
    // navigation.navigate(AppRoute.PROFILE_PERSONAL);
  };

  const onDelete = ({ index, target }: { index: number; target: string }) => {
    // dispatch(deleteUserIndustry({ index, target }));
    let industries: string[] = [];
    switch (target) {
      case 'yourIndustries':
        industries = userState.userInfo.yourIndustries;
        break;
      case 'partnerIndustries':
        industries = userState.userInfo.partnerIndustries;
        break;
      case 'sellToIndustries':
        industries = userState.userInfo.sellToIndustries;
        break;
    }
    let dataFilter: string[] = [];
    if (!target || industries.length === 0) {
    } else {
      dataFilter = industries.filter((_: any, i: number) => index !== i);
    }
    setUserState({ ...userState, userInfo: { ...userState?.userInfo, [target]: dataFilter } });
  };

  const handleModalLogout = () => {
    setModalLogout(!modalLogout);
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(onLogout());
    dispatch(destroyData());
    socketDestroy();
  };

  useEffect(() => {
    setValue('name', `${userState?.userInfo?.firstName} ${userState?.userInfo?.lastName}`);
    setValue('title', userState?.userInfo?.title);
    setValue('introduction', userState?.userInfo?.introduction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState?.userInfo]);

  return (
    <>
      <ProfileTemplateSceen onBack={onBack} isBackButton={true}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.scrollViewWhite]}>
          {!showEdit.profile &&
            <View style={styles.buttonEditContainer}>
              <ButtonSecond
                title={t('edit_profile')}
                titleStyle={{ ...GlobalStyles.mr5 }}
                onPress={onPress}
                showIcon={false}
                CustomIcon={EditIcon}
              />
            </View>}
          {!showEdit?.profile ?
            <View style={styles.userInfoContainer}>
              <Paragraph
                h2
                bold
                title={`${userState?.userInfo?.firstName} ${userState?.userInfo?.lastName}`}
                style={styles.defaultTextColor}
              />
              <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mt5]}>
                <Email />
                <Paragraph
                  p
                  title={`${userState?.userInfo?.email}`}
                  style={[GlobalStyles.ml5, styles.email]}
                />
              </View>
              <Paragraph h4 bold title={userState?.userInfo?.title} style={[styles.mainTextColor, GlobalStyles.mt10]} />
              <Paragraph
                h4
                title={userState?.userInfo?.introduction}
                style={[styles.defaultTextColor, GlobalStyles.mt15, styles.description]}
              />
            </View>
            :
            <View>
              <InputValidateControl
                styleArea={styles.styleArea}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholder={t('name')}
                selectionColor={BASE_COLORS.blackTransparent}
                placeholderTextColor={BASE_COLORS.spanishGrayColor}
                control={control}
                name={PROFILE_FIELDS.name}
                register={register}
              />
              <InputValidateControl
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholder={t('professtional_title')}
                selectionColor={BASE_COLORS.blackTransparent}
                placeholderTextColor={BASE_COLORS.spanishGrayColor}
                control={control}
                name={PROFILE_FIELDS.title}
                register={register}
              />
              <InputValidateControl
                inputStyle={styles.textAreaStyle}
                labelStyle={styles.labelStyle}
                placeholder={t('briefly')}
                selectionColor={BASE_COLORS.blackTransparent}
                placeholderTextColor={BASE_COLORS.spanishGrayColor}
                control={control}
                name={PROFILE_FIELDS.introduction}
                register={register}
                multiline={true}
              />
            </View>
          }
          {showEdit?.profile &&
            <View style={GlobalStyles.alignCenter}>
              <Paragraph h4 bold600 textBlack title={t('industry_information')} style={[GlobalStyles.mt30]} />
            </View>}
          <View style={styles.cardContainer}>
            <ProfileBlock
              userInfo={userState?.userInfo}
              onDelete={onDelete}
              edit={showEdit?.profile}
              handleIndustry={handleIndustry}
            />
          </View>
          {showEdit?.profile && (
            <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
              <View style={{ flex: 1 }}>
                <Button
                  title={t('cancel')}
                  bordered
                  h3
                  textCenter
                  onPress={onCancel}
                  containerStyle={styles.buttonContainerStyle}
                  textStyle={styles.h5BoldDefault}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title={t('done')}
                  bordered
                  h3
                  textCenter
                  onPress={handleSubmit(onDone)}
                  containerStyle={styles.buttonPrimaryContainerStyle}
                  textStyle={styles.h5BoldDefault}
                />
              </View>
            </View>
          )}
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
        </View>
        {!showEdit?.profile &&
          <View style={[GlobalStyles.mb20, styles.informationSection]}>
            <Pressable style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.item]}>
              <Chat />
              <Paragraph h4 bold600 textBlack title={t('ask_us_question')} style={GlobalStyles.ml15} />
            </Pressable>
            <Pressable style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.item]}>
              <Question />
              <Paragraph h4 bold600 textBlack title={t('FAQ')} style={GlobalStyles.ml15} />
            </Pressable>
            <Pressable style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.item, { borderBottomWidth: 0 }, GlobalStyles.mb5]} onPress={onPressPolicy} android_ripple={{ color: '#cdcdcd' }}>
              <Shield />
              <Paragraph h4 bold600 textBlack title={t('privacy_policy')} style={[GlobalStyles.ml15]} />
            </Pressable>
            <View style={GlobalStyles.mh20}>
              <Button
                title={t('Logout')}
                bordered
                h3
                textCenter
                onPress={handleModalLogout}
                containerStyle={styles.buttonPrimaryContainerStyle}
                textStyle={styles.h5BoldDefault}
              />
            </View>
          </View>
        }
        {modalLogout && (
          <ModalDialogCommon
            isVisible={modalLogout}
            onHideModal={handleModalLogout}
            isDefault={false}
            styleModal={styles.styleModal}
            styleModalContainer={styles.styleModalContainer}>
            <Paragraph h5 bold600 title={t('logout')} style={GlobalStyles.pv20} />
            <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
              <Button
                isIconLeft={true}
                title={t('cancel')}
                bordered
                h3
                textCenter
                onPress={handleModalLogout}
                containerStyle={styles.cancelButtonArea}
                textStyle={styles.textStyle}
              />
              <Button
                bordered
                title={t('confirm')}
                onPress={handleLogout}
                containerStyle={styles.mainButtonArea}
                textStyle={styles.mainButtonTextStyle}
                textWhite
              />
            </View>
          </ModalDialogCommon>
        )}
      </ProfileTemplateSceen>
      <Loading />
    </>
  );
};

export default ProfileScreen;
