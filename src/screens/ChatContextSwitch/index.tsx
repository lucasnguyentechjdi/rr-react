import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Image, Paragraph} from '~Root/components';
import React, {useEffect, useState} from 'react';
import {findObjectInArray, upperCaseFirstLetter} from '~Root/utils/functions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import ChatAPI from '~Root/services/chat/apis';
import {IAskType} from '~Root/services/askType/types';
import {CHAT_MEMBER_ROLE, CHAT_TYPE, IChat, IChatMember} from '~Root/services/chat/types';
import {IGlobalState} from '~Root/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {adjust} from '~Root/utils';
import {checkAskIsEnd, getAskDropDown} from '~Root/services/ask/actions';
import {imageUrl} from '~Root/services/upload';
import styles from './styles';
import {getAskDetail, viewDetailChat} from '~Root/services/chat/actions';
import {mergeUnique} from '~Root/utils/common';
import UserAvatar from '~Root/components/UserAvatar';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.CHAT_CONTEXT_SWITCH>;

const ChatContextSwitch = ({navigation, route}: Props) => {
  const {code} = route.params;
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const {dataDropDown} = useSelector((state: IGlobalState) => state.askState);
  const [listChatApproved, setListChatApproved] = useState<IChat[]>([]);
  const {chatInfo} = useSelector((state: IGlobalState) => state.chatState);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const withUser = chatInfo?.members.find(member => member.userCode === code);

  useEffect(() => {
    void getData();
    setPage(1);
    if (dataDropDown) dispatch(getAskDropDown());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const getData = async (page = 1, limit = 10) => {
    const params = {
      page,
      limit,
      status: 'approved',
    };
    const {success, data, message} = await ChatAPI.getChatApproved(code, params);
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
    if (data?.data) {
      setListChatApproved(page === 1 ? data?.data : mergeUnique(listChatApproved, data?.data));
    }
    if (data?.metadata) {
      setPage(data?.metadata?.pageCurrent);
      setLimit(data?.metadata?.recordPerPage);
      setTotal(data?.metadata?.recordTotal);
    }
  };

  const getDataNextPage = () => {
    if (page * limit >= total) {
      return;
    }
    void getData(page + 1, limit);
  };

  const onItemClick = (item: IChat) => {
    console.log('chat');
    dispatch(viewDetailChat(item));
    dispatch(getAskDetail(item.askCode));
    navigation.push(AppRoute.CHAT_INTERNAL, {chatInfo: item});
  };

  const onItemClickGeneral = (item: IChat) => {
    dispatch(viewDetailChat(item));
    navigation.push(AppRoute.CHAT_GENERAL_INTERNAL, {chatInfo: item});
  };

  const onBack = () => {
    navigation.goBack();
  };

  const getUserName = () => {
    const firstName = withUser?.user?.firstName ?? '';
    const lastName = withUser?.user?.lastName ?? '';
    return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
  };

  const getNewMessageCount = (myInfo: IChatMember | undefined) => {
    if (!myInfo || !myInfo.newMessageCount || myInfo.newMessageCount === 0) return 0;
    return myInfo.newMessageCount;
  };

  const renderGeneralChat = (item: IChat) => {
    const withUser = item.members.find(member => member.userCode !== userInfo.code);
    const myRole = item.members.find(member => member.userCode === userInfo.code);
    return (
      <TouchableOpacity onPress={() => onItemClickGeneral(item)} style={styles.boxChat}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.alignCenter]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
            <UserAvatar user={withUser?.user} size={30} imageSize={40} />
            <Paragraph h4 textBlack bold title={'Private Chat'} style={GlobalStyles.pl5} />
          </View>
          <View style={styles.arrowGroup}>
            {getNewMessageCount(myRole) > 0 && (
              <View style={styles.count}>
                <Paragraph
                  p
                  textWhite
                  title={getNewMessageCount(myRole).toString()}
                  style={styles.countText}
                  numberOfLines={1}
                />
              </View>
            )}
            <Icon name='caret-right' size={adjust(18)} color={BASE_COLORS.whiteColor} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.bg, styles.container]}>
      <SafeAreaView style={[GlobalStyles.container]} edges={['right', 'left']}>
        <TouchableOpacity onPress={onBack} style={styles.btnClose}>
          <Icon name='times' size={adjust(15)} color={BASE_COLORS.whiteColor} />
        </TouchableOpacity>
        <View style={[GlobalStyles.center, GlobalStyles.pt5]}>
          <UserAvatar user={withUser?.user} size={90} imageSize={110} />
          <Paragraph h2 textBlack bold title={getUserName()} style={{marginTop: adjust(12)}} />
        </View>
        <View style={[GlobalStyles.mt20, styles.border_1]} />
        <FlatList
          data={listChatApproved.sort((a, b) => (a.type === CHAT_TYPE.GENERAL ? -1 : 1))}
          renderItem={({item}) => {
            if (item.type === CHAT_TYPE.GENERAL) {
              return renderGeneralChat(item);
            }
            const asker = item.members.find(member => member.role === 'asker');
            const myRole = item.members.find(member => member.userCode === userInfo?.code);
            let roleText = '';
            if (myRole?.role === 'asker') {
              roleText = 'Your ask';
            } else if (myRole?.role === 'introducer') {
              roleText = 'You Are Introducing';
            } else if (myRole?.role === 'responder') {
              roleText = 'You Are Responding';
            }
            return (
              <TouchableOpacity onPress={() => onItemClick(item)} style={styles.boxChat}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.alignCenter]}>
                  <View style={[{backgroundColor: BASE_COLORS.oxleyColor}, styles.textHeader]}>
                    <Paragraph
                      textWhite
                      bold
                      title={
                        dataDropDown &&
                        findObjectInArray<IAskType>(dataDropDown, item.ask.typeCode ?? '', 'code', 'name')
                      }
                    />
                  </View>
                  <View style={[{backgroundColor: BASE_COLORS.blackColor}, styles.textHeader, GlobalStyles.ml10]}>
                    <Paragraph textWhite bold title={roleText.toUpperCase()} />
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    GlobalStyles.justifyBetween,
                    GlobalStyles.alignCenter,
                    GlobalStyles.mt10,
                  ]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.askTitle]}>
                    {asker?.user.avatar ? (
                      <Image
                        source={{
                          uri: imageUrl(asker?.user.avatar),
                        }}
                        style={styles.imageSmall}
                      />
                    ) : (
                      <Icon name='user-circle' size={adjust(40)} color={BASE_COLORS.blackColor} />
                    )}
                    <View>
                      <Paragraph
                        h3
                        textBlack
                        bold
                        title={`${item?.ask?.content?.target ?? ''}`}
                        style={GlobalStyles.pl5}
                      />
                      <Paragraph
                        p
                        textBlack
                        title={`${asker?.user?.firstName ?? ''} ${asker?.user?.lastName ?? ''}`}
                        style={GlobalStyles.pl5}
                      />
                    </View>
                  </View>
                  <View style={styles.arrowGroup}>
                    {checkAskIsEnd(item.ask) && (
                      <View style={[styles.askEndStyleContainer, GlobalStyles.mb5]}>
                        <Paragraph
                          title={'Ask Ended'}
                          textWhite
                          style={[styles.labelEndStyle, GlobalStyles.textUppercase]}
                        />
                      </View>
                    )}
                    {getNewMessageCount(myRole) > 0 && (
                      <View style={styles.count}>
                        <Paragraph
                          p
                          textWhite
                          title={getNewMessageCount(myRole).toString()}
                          style={styles.countText}
                          numberOfLines={1}
                        />
                      </View>
                    )}
                    <Icon name='caret-right' size={adjust(18)} color={BASE_COLORS.whiteColor} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.code}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={getDataNextPage}
        />
      </SafeAreaView>
    </View>
  );
};
export default ChatContextSwitch;
