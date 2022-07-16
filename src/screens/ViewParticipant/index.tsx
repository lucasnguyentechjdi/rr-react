import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {Icon, Image, Paragraph} from '~Root/components';

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {adjust} from '~Root/utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {CHAT_MEMBER_ROLE, IChat} from '~Root/services/chat/types';
import {getFullName} from '~Root/services/user/actions';
import UserAvatar from '~Root/components/UserAvatar';
import {IUser} from '~Root/services/user/types';
import {getAskDetail, viewDetailChat} from '~Root/services/chat/actions';
import ChatAPI from '~Root/services/chat/apis';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VIEW_PARTICIPANT>;

const ViewParticipant = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {chatInfo} = useSelector((state: IGlobalState) => state.chatState);
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const [participants, setParticipants] = React.useState({});
  const [chatData, setChatData] = React.useState<IChat[]>([]);
  const [total, setTotal] = React.useState(0);
  const dispatch = useDispatch();
  if (!chatInfo) {
    navigation.goBack();
  }
  const currentUser = chatInfo?.members.find(member => member.userCode === userInfo.code);

  const onBack = () => {
    navigation.goBack();
  };

  const getData = async () => {
    if (!chatInfo?.askCode) return;
    const params = {
      page: 1,
      limit: 100,
      status: '',
    };
    const {success, data, message} = await ChatAPI.getChatByAskCode(chatInfo?.askCode, params);
    if (!success) {
      Toast.show({
        position: 'top',
        type: 'error',
        text1: message ?? '',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }
    const responders: any = {};
    data.data.forEach((item: IChat) => {
      const responder: any = item.members.find(member => member.role === CHAT_MEMBER_ROLE.RESPONDER);
      const introducer = item.members.find(member => member.role === CHAT_MEMBER_ROLE.INTRODUCER);
      if (!responder) return;
      if (!responders[responder.userCode]) {
        responder.introducers = introducer ? [introducer] : [];
        responder.chatCode = item.code;
        responders[responder.userCode] = responder;
      } else {
        const introducers = responders[responder.userCode].introducers;
        responders[responder.userCode].introducers = [...introducers, introducer];
      }
    });
    setChatData(data.data);
    setParticipants(responders);
    setTotal(Object.keys(responders).length);
  };

  const viewProfile = (user: IUser) => {
    navigation.navigate(AppRoute.GUEST_PROFILE, {userInfo: user});
  };

  const onChat = (chatCode: string) => {
    const item = chatData.find(item => item.code === chatCode);
    if (!item) return;
    dispatch(viewDetailChat(item));
    dispatch(getAskDetail(item.askCode));
    navigation.push(AppRoute.CHAT_INTERNAL, {chatInfo: item});
  };

  useEffect(() => {
    void getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatInfo]);

  return (
    <View style={GlobalStyles.containerTealBlue}>
      <SafeAreaView style={[GlobalStyles.container, GlobalStyles.ph20]} edges={['top', 'right', 'left']}>
        <TouchableOpacity onPress={onBack} style={styles.btnClose}>
          <Icon name='times' size={adjust(15)} color={BASE_COLORS.whiteColor} />
        </TouchableOpacity>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={GlobalStyles.flexColumn}>
            <Paragraph
              h4
              bold
              textWhite
              textCenter
              title={t('view_participants').toUpperCase()}
              style={[GlobalStyles.mb20, GlobalStyles.mt20]}
            />
            <View style={[GlobalStyles.flexRow, GlobalStyles.center, GlobalStyles.mb20]}>
              <Paragraph bold textWhite title={total.toString()} style={[GlobalStyles.mr10, styles.count]} />
              <Paragraph title={t('responders')} h4 bold600 textWhite textCenter />
            </View>
            {Object.keys(participants).map((code: any) => {
              const item = participants[code];
              if (!item) return <></>;
              return (
                <>
                  <View style={(GlobalStyles.flexColumn, GlobalStyles.mb15)}>
                    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb10]}>
                      <View style={[GlobalStyles.mr10, GlobalStyles.mt15]}>
                        <UserAvatar user={item.user} size={80} imageSize={90} />
                      </View>
                      <View style={[GlobalStyles.flexColumn, styles.block, GlobalStyles.mt10]}>
                        <Paragraph h3 bold textWhite title={getFullName(item.user)} style={GlobalStyles.mb10} />
                        {item.introducers.length === 0 ? (
                          <Paragraph
                            h5
                            italic
                            title={'DIRECT RESPONDER'}
                            style={[GlobalStyles.mb10, styles.subTitle]}
                          />
                        ) : (
                          <Paragraph h5 italic title={'INTRODUCERS'} style={[GlobalStyles.mb10, styles.subTitle]} />
                        )}
                        {item.introducers.length > 0 && (
                          <View style={GlobalStyles.flexRow}>
                            {item.introducers.map((introducer: any) => (
                              <UserAvatar user={introducer.user} size={40} imageSize={50} />
                            ))}
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
                      {currentUser?.role === CHAT_MEMBER_ROLE.ASKER && (
                        <TouchableOpacity
                          onPress={() => onChat(item.chatCode)}
                          style={[styles.btnCommentGreen, GlobalStyles.mr5]}>
                          <Icon name='comment-alt' size={adjust(15)} color={BASE_COLORS.whiteColor} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={() => viewProfile(item.user)} style={styles.btnGreen}>
                        <Paragraph textWhite title={'View Profile'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.borderBottom} />
                </>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default ViewParticipant;
