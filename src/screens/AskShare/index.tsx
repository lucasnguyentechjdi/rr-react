import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Button, HomeTemplateScreen, Icon, Loading, Paragraph } from '~Root/components';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { adjust, buildShareLink } from '~Root/utils';
import { askLocation, getAskByRefId, getAskSuccess } from '~Root/services/ask/actions';
import { getAskDetail, viewDetailChat } from '~Root/services/chat/actions';
import { hideLoading, showLoading } from '~Root/services/loading/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import AskAPI from '~Root/services/ask/apis';
import ChatAPI from '~Root/services/chat/apis';
import Clipboard from '@react-native-community/clipboard';
import EditIcon from './iconEdit';
import { IGlobalState } from '~Root/types';
import { IUserState } from '~Root/services/user/types';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import ModalDialogReport from '~Root/components/ModalDialogReport';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { getUserAskData } from '~Root/services/user/actions';
import moment from 'moment';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import analytics from '@react-native-firebase/analytics';
import Flurry from 'react-native-flurry-sdk';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.HOME_DETAIL>;

const AskShareScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const authState = useSelector((state: IGlobalState) => state.authState);
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
  const [visibleReport, setVisibleReport] = useState(false);

  const getAskInfo = async (code: string) => {
    dispatch(showLoading());
    const result = await AskAPI.getAskBySecretCode(code);
    if (!result.success) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('ask_not_found'),
        visibilityTime: 2000,
        autoHide: true,
      });
      navigation.push(AppRoute.SPLASH);
      return;
    }
    dispatch(getAskSuccess({ data: result.data }));
    dispatch(hideLoading());
  };

  useLayoutEffect(() => {
    const code = route.params?.reference_id;
    dispatch(showLoading());
    if (!authState.isLoggedIn) {
      setTimeout(() => {
        dispatch(hideLoading());
        navigation.replace(AppRoute.INVITE_CODE, { invite_code: code });
      }, 200);
      return;
    }
    if (code) {
      void getAskInfo(code);
    }
    dispatch(hideLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  useEffect(() => {
    if (data_ask_selected?.endDate) {
      if (!moment(data_ask_selected?.endDate).isAfter(moment())) {
        setModalExpireVisible(true);
      }
    }
  }, [data_ask_selected?.endDate, route.params?.reference_id]);

  const onBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    if (!authState.isLoggedIn) {
      navigation.push(AppRoute.LOGIN);
      return;
    }
    navigation.push(AppRoute.SPLASH);
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

  const onEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const onModalVisible = () => {
    setModalVisible(!isVisible);
  };

  const onModalExpireVisible = () => {
    setModalExpireVisible(false);
  };

  const onPress = () => {
    setModalEndAskVisible(true);
  };

  const onEdiAsk = () => {
    navigation.navigate(AppRoute.ASK_UPDATE);
  };

  const onChat = async () => {
    if (!data_ask_selected?.userCode) return;
    const result = await ChatAPI.createChatByShare(data_ask_selected?.code);
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

  const onVisibleReport = () => {
    setVisibleReport(!visibleReport);
  };

  const onDoneReport = async (message: string) => {
    if (!data_ask_selected) return;
    const result = await AskAPI.reportAsk(data_ask_selected?.code, message);
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('send_report_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      setVisibleReport(false);
    }
  };

  return (
    <HomeTemplateScreen
      onBack={onBack}
      onProfile={onProfile}
      onEdit={onEdit}
      profile={askUser()}
      isBackButton={true}
      showLogout={data_ask_selected?.userCode === userInfo.code}
      containerHeaderStyle={GlobalStyles.containerHeaderStyle}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.pv15]}>
            <Paragraph
              h3
              title={data_ask_selected?.userCode === userInfo.code ? 'My Ask' : `${askUser()?.firstName ?? ''}'s Ask`}
            />
            {data_ask_selected?.userCode === userInfo.code && (
              <View style={styles.editButton}>
                <TouchableOpacity onPress={onEditProfile}>
                  <Icon name='pencil-alt' color={BASE_COLORS.davysGreyColor} size={16} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.mb10]}>
            <View style={[GlobalStyles.tagStyleContainer, GlobalStyles.mb15, styles.tagStyleContainer]}>
              <Paragraph
                p
                textCenter
                title={data_ask_selected?.askType.name ?? ''}
                style={[GlobalStyles.tagStyle, GlobalStyles.textUppercase, styles.tagStyle]}
              />
            </View>
            <Text style={GlobalStyles.mb10}>
              <Paragraph
                h5
                bold
                textEerieBlackColor
                title={`${data_ask_selected?.content?.target ?? ''}`}
                style={[GlobalStyles.mb15, styles.text]}
              />
              <Paragraph
                h5
                textEerieBlackColor
                title={` ${data_ask_selected?.content?.detail ?? ''}`}
                style={[GlobalStyles.mb15, styles.text]}
              />
            </Text>
            <View style={[GlobalStyles.borderBottom, GlobalStyles.mb15, styles.borderBottom, styles.underlineCenter]}>
              <View style={styles.textUnderlineArea}>
                <Paragraph h5 textEerieBlackColor title={'FOR:'} />
              </View>
            </View>
            <Paragraph
              h5
              textEerieBlackColor
              title={data_ask_selected?.content?.info ?? ''}
              style={[GlobalStyles.mb15, GlobalStyles.pb10, GlobalStyles.borderBottom, styles.borderBottom]}
            />
            <View
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.mb15,
                GlobalStyles.pb10,
                GlobalStyles.borderBottom,
                styles.borderBottom,
              ]}>
              <View style={[GlobalStyles.mr5, styles.locationContainer]}>
                <Icon
                  name='map-marker-alt'
                  color={BASE_COLORS.blackColor}
                  size={adjust(12)}
                  style={GlobalStyles.mr10}
                />
                <Paragraph
                  textEerieBlackColor
                  title={askLocation(data_ask_selected)}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={styles.title}
                />
              </View>
              {data_ask_selected?.endDate && !data_ask_selected?.noEndDate && (
                <View style={styles.dateContainer}>
                  <Icon name='calendar' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
                  <Paragraph
                    textEerieBlackColor
                    title={`${moment(data_ask_selected?.endDate ?? '').format('MMM DD YYYY')}`}
                  />
                </View>
              )}
            </View>
            {!!data_ask_selected?.additionalInformation && (
              <Paragraph
                h5
                textEerieBlackColor
                title={data_ask_selected?.additionalInformation}
                style={[GlobalStyles.mb15, styles.text]}
              />
            )}
            {data_ask_selected?.userCode !== userInfo.code && isLoggedIn && (
              <TouchableOpacity onPress={() => setVisibleReport(true)}>
                <View style={[GlobalStyles.flexRow, styles.reportContainer]}>
                  <Icon name='flag' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
                  <Paragraph p title={'Report'} />
                </View>
              </TouchableOpacity>
            )}
            <View style={[GlobalStyles.flexColumn, styles.buttonGroup]}>
              {showEditProfile ? (
                <>
                  {!data_ask_selected?.isEnd && (
                    <>
                      <Button
                        isIconLeft={true}
                        title={t('edit_ask')}
                        bordered
                        h3
                        textCenter
                        onPress={onEdiAsk}
                        containerStyle={styles.buttonContainerStyle}
                        textStyle={styles.h5BoldDefault}>
                        <EditIcon />
                      </Button>
                      <Button
                        isIconLeft={true}
                        title={t('change_deadline')}
                        bordered
                        h3
                        textCenter
                        onPress={onModalVisible}
                        containerStyle={styles.buttonContainerStyle}
                        textStyle={styles.h5BoldDefault}>
                        <Icon
                          name='calendar-week'
                          color={BASE_COLORS.blackColor}
                          size={adjust(12)}
                          style={GlobalStyles.mr10}
                        />
                      </Button>
                      <Button
                        isIconLeft={true}
                        title={t('end_this_ask')}
                        bordered
                        h3
                        textCenter
                        onPress={onPress}
                        containerStyle={styles.buttonContainerStyle}
                        textStyle={styles.h5BoldDefault}>
                        <Icon
                          name='times-circle'
                          color={BASE_COLORS.blackColor}
                          size={adjust(12)}
                          style={GlobalStyles.mr10}
                        />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {isLoggedIn && data_ask_selected?.userCode !== userInfo.code ? (
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
                    </View>
                  ) : (
                    <Button
                      isIconLeft={true}
                      title={t('share')}
                      bordered
                      h3
                      textCenter
                      onPress={onShare}
                      containerStyle={styles.buttonContainerStyle}
                      textStyle={styles.h5BoldDefault}>
                      <Icon
                        name='external-link-alt'
                        color={BASE_COLORS.blackColor}
                        size={adjust(12)}
                        style={GlobalStyles.mr10}
                      />
                    </Button>
                  )}
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
                </>
              )}
              {/* {data_ask_selected?.userCode !== userInfo.code && (
                <Button
                  bordered
                  title={t('custom_introduction')}
                  onPress={onVisibleModal}
                  containerStyle={GlobalStyles.mainButtonArea}
                  textStyle={{...GlobalStyles.mainButtonTextStyle, ...GlobalStyles.h5, ...styles.textStyle}}
                  textWhite
                />
              )} */}
            </View>
          </View>
        </View>
      </ScrollView>
      {visibleReport && (
        <ModalDialogReport
          visibleModal={visibleReport}
          onVisibleModal={onVisibleReport}
          onCancel={onVisibleReport}
          onDone={onDoneReport}
          isDefault={false}
        />
      )}
    </HomeTemplateScreen>
  );
};

export default AskShareScreen;
