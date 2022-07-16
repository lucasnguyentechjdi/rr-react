import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Button, Icon, ModalDialogMessage, ModalDialogRefer, Paragraph } from '~Root/components';
import HomeTemplateScreen from '~Root/components/HomeTemplate/airFeedTemplate';
import React, { useCallback, useState } from 'react';
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { adjust, buildShareLink } from '~Root/utils';
import { createChatInternal, setIndexAsk } from '~Root/services/feed/actions';
import { getAskDetail, viewDetailChat } from '~Root/services/chat/actions';
import { hideLoading, showLoading } from '~Root/services/loading/actions';
import { userReferRequest } from '~Root/services/user/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import AskAPI from '~Root/services/ask/apis';
import ChatAPI from '~Root/services/chat/apis';
import Clipboard from '@react-native-community/clipboard';
import { IGlobalState } from '~Root/types';
import ModalDialogReport from '~Root/components/ModalDialogReport';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import Toast from 'react-native-toast-message';
import { askLocation } from '~Root/services/ask/actions';
import moment from 'moment';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import analytics from '@react-native-firebase/analytics';
import Flurry from 'react-native-flurry-sdk';
import Location from '../HomeDetail/icon/Location';
import Calendar from '../HomeDetail/icon/Calendar';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileSecondScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const indexQuestion = route.params?.indexAsk ?? 0;

  // const userState = useSelector((state: IGlobalState) => state.userState);
  const { infoAsk } = useSelector((state: IGlobalState) => state.feedState);
  const { userInfo } = useSelector((state: IGlobalState) => state.userState);
  const { isLoggedIn } = useSelector((state: IGlobalState) => state.authState);
  const [textSearch, setTextSearch] = useState('');
  const [visibleModal, setVisibleModal] = useState({
    modalRefer: false,
    modalMessage: false,
  });
  const [visibleReport, setVisibleReport] = useState(false);

  const onEdit = () => {
    navigation.navigate(AppRoute.INVITE_CONTACT);
  };

  const onProfile = () => {
    if (!infoAsk?.user) return;
    navigation.navigate(AppRoute.GUEST_PROFILE, { userInfo: infoAsk.user });
  };

  const onBack = () => {
    navigation.goBack();
  };

  const goToChat = async (code: string) => {
    const chatInfo = await ChatAPI.getChatInfo(code);
    dispatch(viewDetailChat(chatInfo.data));
    dispatch(getAskDetail(chatInfo.data.askCode));
    navigation.navigate(AppRoute.CHAT_INTERNAL, { chatInfo: chatInfo.data });
  };

  const onCreateChat = () => {
    dispatch(showLoading());
    dispatch(
      createChatInternal({ askCode: infoAsk?.code as string }, (response: any) => {
        dispatch(hideLoading());
        if (!response) {
          return;
        }
        if (!response.success) {
          Toast.show({
            position: 'bottom',
            type: response.success ? 'success' : 'error',
            text1: response.message,
            visibilityTime: 4000,
            autoHide: true,
          });
        }
        if (response.success && response?.data?.code) {
          void goToChat(response.data.code);
        }
      }),
    );
  };
  const onIntroduceAction = () => {
    setVisibleModal({ ...visibleModal, modalRefer: true });
  };
  const onVisibleMessageModal = () => {
    setVisibleModal({ ...visibleModal, modalMessage: !visibleModal.modalMessage });
  };
  const onVisibleReferModal = () => {
    setVisibleModal({ ...visibleModal, modalRefer: !visibleModal.modalRefer });
  };

  const onSelect = () => {
    setVisibleModal({ modalRefer: false, modalMessage: true });
  };

  const onSelectIndividual = () => {
    dispatch(setIndexAsk(indexQuestion));
    navigation.navigate(AppRoute.INDIVIDUAL_MESSAGE_MODAL);
  };
  const onSelectJoint = () => {
    dispatch(setIndexAsk(indexQuestion));
    navigation.navigate(AppRoute.JOINT_MESSAGE_MODAL);
  };

  const onInputChange = useCallback(
    (text: string) => {
      setTextSearch(text);
      dispatch(
        userReferRequest(text, () => {
          console.log('search');
        }),
      );
    },
    [dispatch],
  );

  const onShare = async () => {
    if (!infoAsk) return;
    const link = await buildShareLink(infoAsk);
    Flurry.logEvent('Share_Ask', {
      code: infoAsk?.code ?? '',
      link,
    });
    await Share.share({
      message: link,
    });
  };

  const copyToClipboard = async () => {
    if (infoAsk?.code) {
      const link = await buildShareLink(infoAsk);
      Flurry.logEvent('Share_Ask', {
        code: infoAsk?.code,
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

  const askContent = () => {
    const target: string = infoAsk?.content?.target ?? '';
    const detail: string = infoAsk?.content?.detail ?? '';
    return `${target} ${detail} ${infoAsk?.content?.info ?? ''}`;
  };

  const onVisibleReport = () => {
    setVisibleReport(!visibleReport);
  };

  const onDoneReport = async (message: string) => {
    const result = await AskAPI.reportAsk(infoAsk?.code, message);
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
      containerHeaderStyle={GlobalStyles.containerHeaderStyle}
      isBackButton={true}
      profile={infoAsk?.user}
      ask={infoAsk}
      showLogout={false}>
      <ScrollView style={[GlobalStyles.container, styles.contentBackground]}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.p15]}>
          <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
            {infoAsk && (
              <View style={styles.askDetailContent}>
                <View style={[GlobalStyles.mb15, GlobalStyles.fullWidth, GlobalStyles.p10]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                    <Text>
                      <Paragraph p textWhite title={'For '} style={styles.textNotoSans} />
                      <Paragraph p textWhite title={infoAsk?.content?.info} style={styles.textNotoSans} />
                    </Text>
                  </View>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                    <View style={[GlobalStyles.mr5, styles.locationContainer]}>
                      <Text style={GlobalStyles.mr5}>
                        <Location />
                      </Text>
                      <Paragraph textWhite title={askLocation(infoAsk)} style={styles.locationText} numberOfLines={1} />
                    </View>
                    {infoAsk.endDate && !infoAsk.noEndDate && (
                      <View style={styles.dateContainer}>
                        <Text style={GlobalStyles.mr5}>
                          <Calendar />
                        </Text>
                        <Paragraph
                          textWhite
                          title={`${moment(infoAsk.endDate).format('MMM DD YYYY')}`}
                          style={styles.textNotoSans}
                        />
                      </View>
                    )}
                  </View>
                  <Paragraph p textWhite title={infoAsk?.additionalInformation ?? ''} style={styles.textNotoSans} />
                </View>
              </View>
            )}
            {infoAsk?.userCode !== userInfo.code && isLoggedIn && (
              <TouchableOpacity
                onPress={() => setVisibleReport(true)}
                style={[GlobalStyles.flexRow, styles.reportContainer]}>
                <Icon name='flag' color={BASE_COLORS.whiteColor} size={adjust(10)} style={GlobalStyles.mr5} />
                <Paragraph textEerieBlackColor bold600 title={t('report')} style={styles.textReport} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[GlobalStyles.mt10]}>
            <Button
              isIconLeft={true}
              title={t('Respond')}
              bordered
              h3
              textCenter
              onPress={onCreateChat}
              containerStyle={styles.buttonContainerHalfStyle}
              textStyle={styles.h5BoldDefault}>
              <Icon name='comment-alt' color={BASE_COLORS.whiteColor} size={adjust(12)} style={GlobalStyles.mr10} />
            </Button>
            <View style={[GlobalStyles.flexRow, styles.buttonGroupMain]}>
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
                  color={BASE_COLORS.whiteColor}
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
                containerStyle={styles.buttonContainerHalfStyle}
                textStyle={styles.h5BoldDefault}>
                <Icon name='copy' color={BASE_COLORS.whiteColor} size={adjust(12)} style={GlobalStyles.mr10} />
              </Button>
            </View>
            <Button
              bordered
              title={t('custom_introduction')}
              onPress={onIntroduceAction}
              containerStyle={{ ...GlobalStyles.mainButtonArea, ...GlobalStyles.container }}
              textStyle={{ ...GlobalStyles.mainButtonTextStyle, ...GlobalStyles.h5, ...styles.textStyle }}
              textWhite
            />
          </View>
        </View>
        {visibleModal?.modalMessage && (
          <ModalDialogMessage
            visibleModal={visibleModal?.modalMessage}
            isDefault={false}
            onVisibleModal={onVisibleMessageModal}
            onSelectIndividual={onSelectIndividual}
            onSelectJoint={onSelectJoint}
          />
        )}
        {visibleModal?.modalRefer && (
          <ModalDialogRefer
            visibleModal={visibleModal?.modalRefer}
            isDefault={false}
            onVisibleModal={onVisibleReferModal}
            onSelect={onSelect}
          />
        )}
        {visibleReport && (
          <ModalDialogReport
            visibleModal={visibleReport}
            onVisibleModal={onVisibleReport}
            onCancel={onVisibleReport}
            onDone={onDoneReport}
            isDefault={false}
          />
        )}
      </ScrollView>
    </HomeTemplateScreen>
  );
};

export default ProfileSecondScreen;
