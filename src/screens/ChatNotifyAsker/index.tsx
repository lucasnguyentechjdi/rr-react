import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, Icon, Image, Loading, Paragraph} from '~Root/components';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import React, {useEffect, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {adjust} from '~Root/utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {AppRoute} from '~Root/navigation/AppRoute';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState, INotificationContent} from '~Root/types';
import ChatAPI from '~Root/services/chat/apis';
import Toast from 'react-native-toast-message';
import {CHAT_MEMBER_ROLE, CHAT_MEMBER_STATUS, IChatMember, INotification} from '~Root/services/chat/types';
import {imageUrl} from '~Root/services/upload';
import UserAvatar from '~Root/components/UserAvatar';
import moment from 'moment';
import {getFullName} from '~Root/services/user/actions';
import AskAPI from '~Root/services/ask/apis';
import {getAskDetail, getUserChatData, viewDetailChat} from '~Root/services/chat/actions';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.CHAT_NOTIFICATION_ASKER>;

const ChatNotificationAsker = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [notification, setNotification] = React.useState<INotification | null>(null);
  const {chatInfo, askInfo} = useSelector((state: IGlobalState) => state.chatState);
  const responder = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.RESPONDER);
  const asker = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.ASKER);
  const introducer = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.INTRODUCER);
  const [feedback, setFeedback] = React.useState<any>(false);
  const [notificationData, setNotificationData] = React.useState<INotificationContent[]>([]);
  const dispatch = useDispatch();

  const contentHeaderInfo = useMemo(() => {
    if (notification?.status === CHAT_MEMBER_STATUS.APPROVED) {
      return {
        bgColor: BASE_COLORS.oxleyColor,
        text: t('accepted'),
        icon: 'check-circle',
      };
    }
    return {
      bgColor: BASE_COLORS.indianRedColor,
      text: t('rejected'),
      icon: 'times-circle',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const getNotification = async () => {
    if (!chatInfo) return;
    const result = await ChatAPI.getNotification(chatInfo.code);
    if (!result.success) {
      Toast.show({
        position: 'top',
        type: 'error',
        text1: result.message,
        visibilityTime: 2000,
        autoHide: true,
      });
      return navigation.navigate(AppRoute.CHAT);
    }
    setNotification(result.data);
    getNotificationData(result.data);
  };

  const onViewProfile = () => {
    if (!responder?.user) return;
    navigation.navigate(AppRoute.GUEST_PROFILE, {userInfo: responder.user});
  };

  const onApprove = async () => {
    if (!chatInfo) return;
    const result = await ChatAPI.sendActionNotification(notification?.code, 'approve');
    Toast.show({
      position: 'top',
      type: result.success ? 'success' : 'error',
      text1: result.success ? 'Approve success' : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      void getNotification();
      void getChatData();
    }
  };

  const getChatData = async () => {
    if (!chatInfo) return;
    const chatInfoNew = await ChatAPI.getChatInfo(chatInfo.code);
    if (!chatInfoNew.data) return;
    dispatch(viewDetailChat(chatInfoNew.data));
    dispatch(getAskDetail(chatInfoNew.data.askCode));
    const page = 1;
    const limit = 10;
    dispatch(getUserChatData('', page, limit, 'refresh', (res: any) => {}));
  };

  const onReject = async () => {
    if (!chatInfo) return;
    const result = await ChatAPI.sendActionNotification(notification?.code, 'reject');
    Toast.show({
      position: 'top',
      type: result.success ? 'success' : 'error',
      text1: result.success ? 'Reject success' : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      void getNotification();
      void getChatData();
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const getDate = (member: IChatMember, format = 'h:mm:A') => {
    if (member.status === CHAT_MEMBER_STATUS.APPROVED) {
      return moment(member.approvedAt).format(format);
    }
    if (member.status === CHAT_MEMBER_STATUS.REJECT) {
      return moment(member.rejectedAt).format(format);
    }
    return '';
  };

  const getDateTimeStamp = (member: IChatMember) => {
    if (member.status === CHAT_MEMBER_STATUS.APPROVED) {
      return moment(member.approvedAt).unix();
    }
    if (member.status === CHAT_MEMBER_STATUS.REJECT) {
      return moment(member.rejectedAt).unix();
    }
    return 0;
  };

  const getAskerMessage = () => {
    const introducerName = introducer?.user ? getFullName(introducer?.user) : '';
    if (asker?.status === CHAT_MEMBER_STATUS.APPROVED) {
      return `You have accepted the introduction from ${introducerName}`;
    }
    if (asker?.status === CHAT_MEMBER_STATUS.REJECT) {
      return `You have declined the introduction from ${introducerName}`;
    }
    return '';
  };

  const getResponderMessage = () => {
    const responderName = responder?.user ? getFullName(responder?.user) : '';
    const introducerName = introducer?.user ? getFullName(introducer?.user) : '';
    if (asker?.status === CHAT_MEMBER_STATUS.APPROVED) {
      return `${responderName} has accepted the introduction from ${introducerName} to you`;
    }
    if (asker?.status === CHAT_MEMBER_STATUS.REJECT) {
      return `${responderName} has declined the introduction from ${introducerName} to you`;
    }
    return '';
  };

  const getAskFeedback = async () => {
    const result = await AskAPI.getAskFeedback(askInfo?.code);
    if (result.data.length > 0) {
      setFeedback(result.data[0]);
    }
  };

  const getFeedbackMessage = () => {
    const responderName = feedback?.user ? getFullName(feedback.user) : '';
    if (!askInfo?.foundResponder) return `You have ended this Ask without a responder.`;
    return `You have ended this Ask with ${responderName}.`;
  };

  const getNotificationData = (notification: any) => {
    const responderName = responder?.user ? getFullName(responder?.user) : '';
    const introducerName = introducer?.user ? getFullName(introducer.user) : '';
    const notificationData: INotificationContent[] = [];
    if (asker) {
      const message = getAskerMessage();
      if (message) {
        notificationData.push({
          text: message,
          date: getDateTimeStamp(asker),
          dateText: getDate(asker, 'DD MMMM YYYY'),
          timeText: getDate(asker),
          user: asker.user,
        });
      }
    }
    if (responder) {
      const message = getResponderMessage();
      if (message) {
        notificationData.push({
          text: message,
          date: getDateTimeStamp(responder),
          dateText: getDate(responder, 'DD MMMM YYYY'),
          timeText: getDate(responder),
          user: responder.user,
        });
      }
    }
    notificationData.sort((a, b) => a.date - b.date);
    notificationData.splice(0, 0, {
      text: `${introducerName} has introduced ${responderName} to you.`,
      date: moment(notification.createdAt).unix(),
      dateText: moment(notification.createdAt).format('DD MMMM YYYY'),
      timeText: moment(notification.createdAt).format('h:mm A'),
      user: introducer?.user,
    });
    setNotificationData(notificationData);
  };

  useEffect(() => {
    void getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(askInfo);
    if (!askInfo?.isEnd) return;
    void getAskFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askInfo]);

  if (!notification)
    return (
      <View style={GlobalStyles.containerWhite}>
        <SafeAreaView style={[GlobalStyles.container]} edges={['top', 'right', 'left']}>
          <View style={styles.header}>
            <Paragraph h4 bold600 title={t('notifications')} />
          </View>
          <Loading />
        </SafeAreaView>
      </View>
    );

  return (
    <View style={GlobalStyles.containerWhite}>
      <SafeAreaView style={[GlobalStyles.container]} edges={['top', 'right', 'left']}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={GlobalStyles.flexColumn}>
            <View style={styles.header}>
              <Paragraph h4 bold600 title={t('notifications')} />
            </View>
            <TouchableOpacity onPress={onBack} style={[GlobalStyles.flexRow, styles.btnBack]}>
              <Icon name='angle-left' size={adjust(15)} color={BASE_COLORS.blackColor} style={GlobalStyles.mr10} />
              <Paragraph bold600 title={t('back_to_chat')} />
            </TouchableOpacity>
            <View style={GlobalStyles.ph15}>
              <View style={[GlobalStyles.flexColumn, styles.bgGray, GlobalStyles.mb30]}>
                <Paragraph textCenter bold600 title={notification.title.toUpperCase()} style={styles.titleText} />
                <View style={styles.iconView}>
                  <Icon name='angle-down' size={adjust(15)} color={BASE_COLORS.whiteColor} style={styles.icon} />
                </View>
              </View>
              <View style={[GlobalStyles.flexColumn, styles.bgGray]}>
                {notification.status !== CHAT_MEMBER_STATUS.PENDING && (
                  <View style={[styles.headerInfo, {backgroundColor: contentHeaderInfo.bgColor}]}>
                    <Icon
                      name={contentHeaderInfo.icon}
                      size={adjust(15)}
                      color={BASE_COLORS.whiteColor}
                      style={GlobalStyles.mr10}
                    />
                    <Paragraph bold textWhite h4 title={contentHeaderInfo.text} />
                  </View>
                )}
                {responder?.user?.avatar && (
                  <Image
                    source={{
                      uri: imageUrl(responder?.user.avatar),
                    }}
                    style={[GlobalStyles.mb15, GlobalStyles.mt15, styles.imageProfile]}
                  />
                )}
                <Paragraph
                  h5
                  textBlack
                  bold
                  title={`${responder?.user?.firstName ?? ''} ${responder?.user?.lastName ?? ''}`.toUpperCase()}
                  style={GlobalStyles.mb15}
                />
                <Paragraph
                  p
                  textBlack
                  textCenter
                  bold600
                  title={`${responder?.user?.title ?? ''}`.toUpperCase()}
                  style={GlobalStyles.mb15}
                />
                <Button
                  bordered
                  title={t('view_profile')}
                  onPress={onViewProfile}
                  containerStyle={{...styles.mainButtonArea, ...GlobalStyles.mb20}}
                  textStyle={styles.mainButtonTextStyle}
                  textWhite
                />
                <View style={GlobalStyles.flexColumn}>
                  <Paragraph p textBlack textCenter bold600 title='Note From Introducer:' style={GlobalStyles.mb20} />
                  <Paragraph p bold600 textBlack textCenter title={notification.content} />
                </View>
              </View>
              {notification.status === CHAT_MEMBER_STATUS.PENDING && (
                <View style={[GlobalStyles.flexRow, styles.buttonGroup, GlobalStyles.mb10, GlobalStyles.mt15]}>
                  <Button
                    bordered
                    title={t('accept')}
                    onPress={onApprove}
                    containerStyle={{...styles.mainButtonArea, ...GlobalStyles.mr10}}
                    textStyle={styles.mainButtonTextStyle}
                    textWhite
                  />
                  <Button
                    title={t('reject')}
                    bordered
                    h3
                    textCenter
                    onPress={onReject}
                    containerStyle={styles.cancelButtonArea}
                    textStyle={styles.textStyle}
                  />
                </View>
              )}
            </View>
            <View style={[{marginHorizontal: adjust(22)}, GlobalStyles.mt15]}>
              {notificationData.map(item => (
                <View key={item.date} style={[GlobalStyles.flexColumn, GlobalStyles.mb5]}>
                  <View style={GlobalStyles.flexRow}>
                    <View style={{width: '48%'}} />
                    <Paragraph bold600 p title={item.dateText} style={styles.textTime} />
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={styles.historyTime}>
                      <Paragraph bold600 h4 title='UPDATE' />
                      <Paragraph bold600 p title={item.timeText} style={styles.textTime} />
                    </View>
                    <View style={{marginRight: adjust(20)}}>
                      {item?.user && <UserAvatar user={item.user} size={24} imageSize={28} />}
                      <View style={[styles.iconStatus, {backgroundColor: BASE_COLORS.oxleyColor}]}>
                        <Icon name='check' size={adjust(10)} color={BASE_COLORS.whiteColor} />
                      </View>
                    </View>
                    <Paragraph style={[GlobalStyles.container, styles.textHistory]} bold p title={item.text} />
                  </View>
                </View>
              ))}
              {askInfo?.isEnd && (
                <View style={[GlobalStyles.flexColumn, GlobalStyles.mb5]}>
                  <View style={GlobalStyles.flexRow}>
                    <View style={{width: '48%'}} />
                    <Paragraph
                      bold600
                      p
                      title={moment(askInfo?.endAt).format('DD MMMM YYYY')}
                      style={styles.textTime}
                    />
                  </View>
                  <View style={styles.itemContainer}>
                    <View style={styles.historyTime}>
                      <Paragraph bold600 h4 title='UPDATE' />
                      <Paragraph bold600 p title={moment(askInfo?.endAt).format('h:mmA')} style={styles.textTime} />
                    </View>
                    <View style={{marginRight: adjust(20)}}>
                      {asker?.user && <UserAvatar user={asker.user} size={24} imageSize={28} />}
                      <View style={[styles.iconStatus, {backgroundColor: BASE_COLORS.oxleyColor}]}>
                        <Icon name='check' size={adjust(10)} color={BASE_COLORS.whiteColor} />
                      </View>
                    </View>
                    <Paragraph
                      style={[GlobalStyles.container, styles.textHistory]}
                      bold
                      p
                      title={getFeedbackMessage()}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default ChatNotificationAsker;
