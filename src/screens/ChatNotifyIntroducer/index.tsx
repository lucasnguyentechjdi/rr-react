import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Icon, Image, Loading, Paragraph} from '~Root/components';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {adjust} from '~Root/utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {CHAT_MEMBER_ROLE, CHAT_MEMBER_STATUS, IChatMember, INotification} from '~Root/services/chat/types';
import Toast from 'react-native-toast-message';
import ChatAPI from '~Root/services/chat/apis';
import UserAvatar from '~Root/components/UserAvatar';
import {getFullName} from '~Root/services/user/actions';
import moment from 'moment';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.CHAT_NOTIFICATION_INTRODUCER>;

const ChatNotifyIntroducer = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [notification, setNotification] = React.useState<INotification | null>(null);
  const {chatInfo, askInfo} = useSelector((state: IGlobalState) => state.chatState);
  const asker = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.ASKER);
  const responder = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.RESPONDER);
  const introducer = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.INTRODUCER);
  const [feedback, setFeedback] = React.useState<any>(false);

  const onBack = () => {
    navigation.goBack();
  };

  const getNotification = async () => {
    console.log(chatInfo);
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
  };

  const notificationTitle = () => {
    const responderName = responder?.user ? getFullName(responder?.user) : '';
    const askerName = asker?.user ? getFullName(asker.user) : '';
    return `You introduced ${responderName} to ${askerName}`;
  };

  const getDate = (member: IChatMember, format = 'h:mmA') => {
    if (member.status === CHAT_MEMBER_STATUS.APPROVED) {
      return moment(member.approvedAt).format(format);
    }
    if (member.status === CHAT_MEMBER_STATUS.REJECT) {
      return moment(member.rejectedAt).format(format);
    }
    return '';
  };

  const getAskFeedback = async () => {
    const result = await AskAPI.getAskFeedback(askInfo?.code);
    if (result.data.length > 0) {
      setFeedback(result.data[0]);
    }
  };

  const getIntroducerMessage = () => {
    const responderName = responder?.user ? getFullName(responder?.user) : '';
    const askerName = asker?.user ? getFullName(asker.user) : '';
    return `You have introduce ${responderName} to ${askerName}`;
  };

  useEffect(() => {
    if (!askInfo?.isEnd) return;
    void getAskFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askInfo]);

  useEffect(() => {
    void getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <View style={styles.header}>
          <Paragraph h4 bold600 title={t('notifications')} />
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.flexRow, styles.btnBack]}>
            <Icon name='angle-left' size={adjust(15)} color={BASE_COLORS.blackColor} style={GlobalStyles.mr10} />
            <Paragraph bold600 title={t('back_to_chat')} />
          </TouchableOpacity>
          <Paragraph bold600 textCenter title={moment(notification.createdAt).fromNow()} />
          <View style={styles.containerInfo}>
            <Paragraph bold p textCenter title={notificationTitle()} />
            <View style={[GlobalStyles.flexRow, GlobalStyles.mt20, GlobalStyles.center]}>
              <View style={styles.imageProfileContainer}>
                {responder?.user && <UserAvatar size={50} user={responder.user} />}
              </View>
              <Icon
                name='arrow-right'
                size={adjust(12)}
                color={BASE_COLORS.eerieBlackColor}
                style={GlobalStyles.mr10}
              />
              <View style={styles.imageProfileContainer}>
                {asker?.user && <UserAvatar size={50} user={asker.user} />}
              </View>
            </View>
          </View>
          <View style={[{marginHorizontal: adjust(22)}, GlobalStyles.mt15]}>
            {introducer && (
              <View style={[GlobalStyles.flexColumn, GlobalStyles.mb5]}>
                <View style={GlobalStyles.flexRow}>
                  <View style={{width: '48%'}} />
                  <Paragraph bold600 p title={getDate(introducer, 'DD MMMM YYYY')} style={styles.textTime} />
                </View>
                <View style={styles.itemContainer}>
                  <View style={styles.historyTime}>
                    <Paragraph bold600 h4 title='UPDATE' />
                    <Paragraph bold600 p title={getDate(introducer)} style={styles.textTime} />
                  </View>
                  <View style={{marginRight: adjust(20)}}>
                    {introducer?.user && <UserAvatar user={introducer.user} size={24} imageSize={28} />}
                    <View style={[styles.iconStatus, {backgroundColor: BASE_COLORS.oxleyColor}]}>
                      <Icon name='check' size={adjust(10)} color={BASE_COLORS.whiteColor} />
                    </View>
                  </View>
                  <Paragraph
                    style={[GlobalStyles.container, styles.textHistory]}
                    bold
                    p
                    title={getIntroducerMessage()}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default ChatNotifyIntroducer;
