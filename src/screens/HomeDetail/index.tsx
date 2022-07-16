import React, { useEffect, useState } from 'react';
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonSecond, Icon,
  Loading,
  ModalChangeDeadLine,
  ModalEndAsk,
  ModalExpire,
  Paragraph
} from '~Root/components';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { askLocation, getAskByRefId } from '~Root/services/ask/actions';
import { getAskDetail, viewDetailChat } from '~Root/services/chat/actions';
import { hideLoading, showLoading } from '~Root/services/loading/actions';

import Clipboard from '@react-native-community/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Flurry from 'react-native-flurry-sdk';
import Toast from 'react-native-toast-message';
import { AppRoute } from '~Root/navigation/AppRoute';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import AskAPI from '~Root/services/ask/apis';
import ChatAPI from '~Root/services/chat/apis';
import { getUserAskData } from '~Root/services/user/actions';
import { IUserState } from '~Root/services/user/types';
import { IGlobalState } from '~Root/types';
import { adjust, buildShareLink } from '~Root/utils';
import { checkHourLeft, timeLeftFormat } from '~Root/utils/functions';
import styles from './styles';
import Location from './icon/Location';
import Calendar from './icon/Calendar'
import AngleLeft from './icon/AngleLeft';
import Tooltip from 'react-native-walkthrough-tooltip';
import MenuEdit from './icon/MenuEdit';
import MenuDeadline from './icon/MenuDeadline';
import MenuEnd from './icon/MenuEnd';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.HOME_DETAIL>;

const HomeDetailScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { userInfo, askPagination }: IUserState = useSelector((state: IGlobalState) => state.userState);
  const { isLoggedIn } = useSelector((state: IGlobalState) => state.authState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const { data_ask_selected } = useSelector((state: IGlobalState) => state.askState);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isVisible, setModalVisible] = useState(false);
  const [isVisibleExpire, setModalExpireVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState({
    modalRefer: false,
    modalMessage: false,
  });
  const [isVisibleEndAsk, setModalEndAskVisible] = useState(false);
  const [optionOwnerAsk, setOptionOwnerAsk] = useState(false);

  useEffect(() => {
    const code = route.params?.reference_id;
    if (code) {
      dispatch(showLoading());
      dispatch(
        getAskByRefId(code, () => {
          dispatch(hideLoading());
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.reference_id]);

  useEffect(() => {
    if (data_ask_selected?.endDate && !data_ask_selected.noEndDate) {
      if (!moment(data_ask_selected?.endDate).isAfter(moment())) {
        setModalExpireVisible(true);
      }
    }
  }, [data_ask_selected?.endDate, route.params?.reference_id]);

  const onBack = () => {
    navigation.goBack();
  };

  const onProfile = () => {
    if (data_ask_selected?.userCode !== userInfo.code && data_ask_selected?.user) {
      navigation.navigate(AppRoute.GUEST_PROFILE, { userInfo: data_ask_selected?.user });
      return;
    }
    navigation.navigate(AppRoute.PROFILE);
  };

  const onEdit = () => {
    console.log('edit');
  };

  const onOptionPress = () => {
    setOptionOwnerAsk(!optionOwnerAsk);
  }

  const onEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const onModalVisible = () => {
    setOptionOwnerAsk(false);
    setModalVisible(!isVisible);
  };

  const onModalExpireVisible = () => {
    setModalExpireVisible(false);
  };

  const onPress = () => {
    setOptionOwnerAsk(false);
    setModalEndAskVisible(true);
  };

  const onEdiAsk = () => {
    setOptionOwnerAsk(false);
    navigation.navigate(AppRoute.ASK_UPDATE);
  };

  const onChat = async () => {
    if (!data_ask_selected?.userCode) return;
    const result = await ChatAPI.createChatInNetwork(data_ask_selected?.code);
    if (!result.success || !result.data) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: result.message,
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    Flurry.logEvent('Create_Chat', {
      code: result.data.code,
      type: 'network',
    });
    const chatInfo = await ChatAPI.getChatInfo(result.data.code);
    if (!chatInfo.success) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('chat_not_found'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    dispatch(viewDetailChat(chatInfo.data));
    dispatch(getAskDetail(chatInfo.data.askCode));
    navigation.navigate(AppRoute.CHAT_INTERNAL, { chatInfo: chatInfo.data });
  };

  const onShare = async () => {
    if (!data_ask_selected) return;
    const link = await buildShareLink(data_ask_selected);
    Flurry.logEvent('Share_Ask', {
      code: data_ask_selected?.code,
      link,
    });
    await Share.share({
      message: link,
    });
  };

  const copyToClipboard = async () => {
    if (data_ask_selected?.code) {
      const link = await buildShareLink(data_ask_selected);
      Flurry.logEvent('Share_Ask', {
        code: data_ask_selected?.code,
        link,
      });
      await Clipboard.setString(link);
      Toast.show({
        position: 'bottom',
        type: 'success',
        text1: 'Copy Successfully!',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const askUser = () => {
    if (data_ask_selected?.userCode !== userInfo.code) return data_ask_selected?.user;
    return userInfo;
  };

  const onVisibleModal = () => {
    setVisibleModal({ ...visibleModal, modalRefer: !visibleModal.modalRefer });
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  const onEnd = () => {
    setModalEndAskVisible(!isVisibleEndAsk);
  };

  const onFoundResponse = () => {
    navigation.navigate(AppRoute.FEED_BACK_MODAL);
  };

  const onEndAskNotFoundResponder = async () => {
    if (!data_ask_selected) return;
    const body: any = {
      feedback: false,
    };
    const result = await AskAPI.endAsk(data_ask_selected?.code, body);
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('end_ask_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      setModalEndAskVisible(!isVisibleEndAsk);
      const page = askPagination?.pageCurrent ?? 1;
      const limit = askPagination?.recordPerPage ?? 50;
      dispatch(getUserAskData(page, limit));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[GlobalStyles.pt20, styles.header]}>
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.flexRow, GlobalStyles.pl20, GlobalStyles.alignCenter, GlobalStyles.alignBaseline]}>
            <Text><AngleLeft /></Text>
            <Paragraph h5 textBlack title={"Back"} style={GlobalStyles.ml10} />
          </TouchableOpacity>
          <View style={[GlobalStyles.mh30, GlobalStyles.mt20]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.justifyBetween, !data_ask_selected?.endDate && { justifyContent: 'flex-end' }]}>
              {data_ask_selected?.endDate && !data_ask_selected.noEndDate && (
                <View style={GlobalStyles.alignBaseline}>
                  <Paragraph
                    textIndianRedColor={checkHourLeft(data_ask_selected.endDate) || false}
                    textGray={checkHourLeft(data_ask_selected.endDate) || false}
                    bold
                    title={`${timeLeftFormat(data_ask_selected?.endDate)}`}
                    style={[GlobalStyles.mb10, styles.timeTag]} />
                </View>
              )}
              {data_ask_selected?.userCode === userInfo.code &&
                <Tooltip
                  isVisible={optionOwnerAsk}
                  onClose={onOptionPress}
                  contentStyle={styles.dropDownContentStyle}
                  content={
                    <View>
                      <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.menuItem]} onPress={onEdiAsk} activeOpacity={0.6}>
                        <MenuEdit />
                        <Paragraph h5 textBlack bold600 title={t('edit_ask')} style={[GlobalStyles.ml5]} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.menuItem]} onPress={onModalVisible} activeOpacity={0.6}>
                        <MenuDeadline />
                        <Paragraph h5 textBlack bold600 title={t('change_deadline')} style={[GlobalStyles.ml5]} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv10]} onPress={onPress} activeOpacity={0.6}>
                        <MenuEnd />
                        <Paragraph h5 textBlack bold600 title={t('end_this_ask')} style={[GlobalStyles.ml5]} />
                      </TouchableOpacity>
                    </View>
                  }
                  placement='bottom'
                >
                  <TouchableOpacity onPress={onOptionPress} style={[styles.editButton]}>
                    <Paragraph h1 textBlack title={"..."} style={styles.editIcon} />
                  </TouchableOpacity>
                </Tooltip>
              }
            </View>
            <View style={GlobalStyles.fullWidth}>
              <Paragraph p textBlack title={data_ask_selected?.askType?.name} style={GlobalStyles.mb10} />
              <Paragraph
                h5
                bold
                textBlack
                title={data_ask_selected?.content?.target + ', ' + data_ask_selected?.content?.detail}
                style={GlobalStyles.mb10}
              />
            </View>
          </View>
        </View>
        <View style={[GlobalStyles.mb15, GlobalStyles.fullWidth, GlobalStyles.ph30, GlobalStyles.pt20]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
            <Text>
              <Paragraph p textWhite title={'For '} style={styles.fontNotoSan} />
              <Paragraph p textWhite title={data_ask_selected?.content?.info} style={styles.fontNotoSan} />
            </Text>
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
            <View style={[GlobalStyles.mr5, styles.locationContainer]}>
              <Text style={GlobalStyles.mr5}><Location /></Text>
              <Paragraph p textWhite title={askLocation(data_ask_selected)} style={styles.locationText} numberOfLines={1} />
            </View>
            {data_ask_selected?.endDate && !data_ask_selected.noEndDate && (
              <View style={styles.dateContainer}>
                <Text style={GlobalStyles.mr5}><Calendar /></Text>
                <Paragraph p textWhite title={`${moment(data_ask_selected.endDate).format('MMM DD YYYY')}`} style={styles.fontNotoSan} />
              </View>
            )}
          </View>
          <Text>
            <Paragraph p textWhite title={` ${data_ask_selected?.additionalInformation ?? ''}`} style={styles.fontNotoSan} />
          </Text>
        </View>
        {showEditProfile ? (
          <>
            {!data_ask_selected?.isEnd && (
              <View style={styles.buttonGroup}>
                <ButtonSecond
                  isIconLeft={true}
                  title={t('edit_ask')}
                  iconName='pencil-alt'
                  iconColor={BASE_COLORS.whiteColor}
                  onPress={onEdiAsk}
                  buttonContainerStyle={{ ...styles.secondButtonStyle, ...GlobalStyles.fullWidth, ...GlobalStyles.mb10 }}
                  titleStyle={styles.whiteText}>
                </ButtonSecond>
                <ButtonSecond
                  isIconLeft={true}
                  title={t('change_deadline')}
                  onPress={onModalVisible}
                  buttonContainerStyle={{ ...styles.secondButtonStyle, ...GlobalStyles.fullWidth, ...GlobalStyles.mb10 }}
                  iconName='calendar-week'
                  iconColor={BASE_COLORS.whiteColor}
                  titleStyle={styles.whiteText}>
                </ButtonSecond>
                <ButtonSecond
                  isIconLeft={true}
                  title={t('end_this_ask')}
                  onPress={onPress}
                  buttonContainerStyle={{ ...styles.secondButtonStyle, ...GlobalStyles.fullWidth, ...GlobalStyles.mb10 }}
                  titleStyle={styles.whiteText}
                  iconName='times-circle'
                  iconColor={BASE_COLORS.whiteColor}>
                </ButtonSecond>
              </View>
            )}
          </>
        ) : (
          <>
            {isLoggedIn && data_ask_selected?.userCode !== userInfo.code ? (
              <View style={styles.buttonGroup}>
                <View style={[GlobalStyles.flexRow, styles.buttonGroupMain]}>
                  <Button
                    isIconLeft={true}
                    title={t('chat')}
                    bordered
                    h3
                    textCenter
                    onPress={onChat}
                    containerStyle={{ ...styles.buttonContainerHalfStyle, ...GlobalStyles.mr10 }}
                    textStyle={styles.h5BoldDefault}>
                    <Icon
                      name='comment-alt'
                      color={BASE_COLORS.blackColor}
                      size={adjust(12)}
                      style={GlobalStyles.mr10}
                    />
                  </Button>
                  <Button
                    isIconLeft={true}
                    title={t('share')}
                    bordered
                    h3
                    textCenter
                    onPress={onShare}
                    containerStyle={styles.buttonContainerHalfStyle}
                    textStyle={styles.h5BoldDefault}>
                    <Icon
                      name='external-link-alt'
                      color={BASE_COLORS.blackColor}
                      size={adjust(12)}
                      style={GlobalStyles.mr10}
                    />
                  </Button>
                  <Button
                    isIconLeft={true}
                    title={t('copy_link')}
                    bordered
                    h3
                    textCenter
                    onPress={copyToClipboard}
                    containerStyle={styles.buttonContainerStyle}
                    textStyle={styles.h5BoldDefault}>
                    <Icon name='copy' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
                  </Button>
                </View>
              </View>
            ) : (
              <View style={[GlobalStyles.flexRow, styles.secondButtonGroup]}>
                <ButtonSecond
                  isIconLeft={true}
                  title={t('share')}
                  onPress={onShare}
                  iconName='external-link-alt'
                  iconColor={BASE_COLORS.whiteColor}
                  buttonContainerStyle={styles.secondButtonStyle}
                  titleStyle={styles.whiteText}>
                </ButtonSecond>
                <ButtonSecond
                  isIconLeft={true}
                  title={t('copy_link')}
                  onPress={copyToClipboard}
                  iconName='copy'
                  iconColor={BASE_COLORS.whiteColor}
                  buttonContainerStyle={styles.secondButtonStyle}
                  titleStyle={styles.whiteText}>
                </ButtonSecond>
              </View>
            )}

          </>
        )}
      </ScrollView >
      {isVisible && (
        <ModalChangeDeadLine
          navigation={navigation}
          isVisible={isVisible}
          isDefault={false}
          onHideModal={onModalVisible}
        />
      )}
      {
        isVisibleExpire && (
          <ModalExpire
            isVisible={isVisibleExpire}
            isDefault={false}
            onHideModal={onModalExpireVisible}
            navigation={navigation}
            onModalVisible={onModalVisible}
            onEnd={onEnd}
          />
        )
      }
      {
        isVisibleEndAsk && (
          <ModalEndAsk
            isVisible={isVisibleEndAsk}
            isDefault={false}
            onHideModal={onEnd}
            onEndAskNotFoundResponder={onEndAskNotFoundResponder}
            navigation={navigation}
            onFoundResponse={onFoundResponse}
          />
        )
      }
    </View >
  );
};

export default HomeDetailScreen;
