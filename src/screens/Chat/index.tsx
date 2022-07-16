import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {HeaderXSSmallBlue, Icon, ListItemsChat, Loading} from '~Root/components';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {PixelRatio, TextInput, View} from 'react-native';
import {getAskDetail, getUserChatData, updateChatData, viewDetailChat} from '~Root/services/chat/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {CHAT_MEMBER_ROLE, CHAT_STATUS, CHAT_TYPE, IChat} from '~Root/services/chat/types';
import {IGlobalState} from '~Root/types';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import debounce from 'lodash.debounce';
import styles from './styles';
import Toast from 'react-native-toast-message';
import {SocketContext} from '~Root/services/socket/context';
import {emitJoinChat} from '~Root/services/socket/emit';
import {listenNewEvent} from '~Root/services/socket/listen';
import moment from 'moment';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.CHAT>;

const ChatScreen = ({navigation}: Props) => {
  const onBack = () => {};

  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const {chatData, chatPagination, chatInfo} = chatState;
  const [textSearch, setTextSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {socket} = useContext(SocketContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((nextValue: string) => searchData(nextValue), 500),
    [],
  );

  const onNotification = (item: IChat) => {
    const currentUser = item?.members.find(member => member.userCode === userInfo.code);
    if (currentUser?.role === CHAT_MEMBER_ROLE.ASKER) {
      navigation.navigate(AppRoute.CHAT_NOTIFICATION_ASKER);
    }
    if (currentUser?.role === CHAT_MEMBER_ROLE.RESPONDER) {
      navigation.navigate(AppRoute.CHAT_NOTIFICATION_RESPONDER);
    }
    if (currentUser?.role === CHAT_MEMBER_ROLE.INTRODUCER) {
      navigation.navigate(AppRoute.CHAT_NOTIFICATION_INTRODUCER);
    }
  };

  const onItemClick = (item: IChat) => {
    dispatch(viewDetailChat(item));
    if (item.type === CHAT_TYPE.GENERAL) {
      navigation.navigate(AppRoute.CHAT_GENERAL_INTERNAL, {chatInfo: item});
      return;
    }
    dispatch(getAskDetail(item.askCode));
    if (item.status === CHAT_STATUS.PENDING) {
      onNotification(item);
      return;
    }
    navigation.navigate(AppRoute.CHAT_INTERNAL, {chatInfo: item});
  };

  const onInputChange = (text: string) => {
    setTextSearch(text);
    debounceSearch(text);
  };

  const searchData = (search: string) => {
    dispatch(showLoading());
    dispatch(
      getUserChatData(
        search,
        chatPagination?.pageCurrent ?? 1,
        chatPagination?.recordPerPage ?? 10,
        'refresh',
        (res: any) => {
          dispatch(hideLoading());
        },
      ),
    );
  };

  const getData = () => {
    dispatch(showLoading());
    dispatch(
      getUserChatData(
        textSearch,
        chatPagination?.pageCurrent ?? 1,
        chatPagination?.recordPerPage ?? 10,
        'refresh',
        (res: any) => {
          dispatch(hideLoading());
          loadAllData(res);
        },
      ),
    );
  };

  const loadAllData = (res: any) => {
    if (res?.data?.metadata?.recordTotal > 10) {
      const totalPage = Math.ceil(res.data.metadata.recordTotal / 10);
      for (let i = 0; i < totalPage - 1; i++) {
        setTimeout(() => {
          loadDataWithPage(i + 2);
        }, i * 500);
      }
    }
  };

  const loadDataWithPage = (page: number) => {
    const limit = chatPagination?.recordPerPage ?? 10;
    dispatch(getUserChatData(textSearch, page, limit, 'loadMore', (res: any) => {}));
  };

  const onRefresh = () => {
    const page = 1;
    const limit = chatPagination?.recordPerPage ?? 10;
    setRefreshing(true);
    dispatch(showLoading());
    dispatch(
      getUserChatData(textSearch, page, limit, 'refresh', (res: any) => {
        setRefreshing(false);
        dispatch(hideLoading());
        loadAllData(res);
      }),
    );
  };

  const handleEvent = (data: any) => {
    console.log('new Event', data);
    if (!data.chatCode) return;
    const chatIndex = chatData.findIndex(item => item.code === data.chatCode);
    if (chatIndex === -1) return;
    chatData[chatIndex].lastMessage = data.data.message;
    const memberIndex = chatData[chatIndex].members.findIndex(member => member.userCode === userInfo.code);
    let newMessageCount = 0;
    console.log(memberIndex);
    if (chatData[chatIndex].members[memberIndex].newMessageCount) {
      newMessageCount = chatData[chatIndex]?.members[memberIndex]?.newMessageCount ?? 0;
    }
    if (chatInfo && chatInfo.code !== data.chatCode) {
      chatData[chatIndex].members[memberIndex].newMessageCount = newMessageCount + 1;
    }
    chatData[chatIndex].updatedAt = moment(data.data.createdAt).toISOString();
    dispatch(
      updateChatData({
        data: chatData.sort((a, b) => moment(b.updatedAt).unix() - moment(a.updatedAt).unix()),
        chatPagination,
      }),
    );
  };

  useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener('focus', () => {
      if (!chatState.chatInfo) return;
      dispatch(viewDetailChat(null));
    });
    if (!socket && !socket.connected) {
      Toast.show({
        position: 'top',
        type: 'error',
        text1: 'Connect to server failed',
        text2: 'Connect to server chat failed! Please try again or reopen app',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    emitJoinChat(socket);
    listenNewEvent(socket, handleEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatData]);

  return (
    <View style={[GlobalStyles.containerWhite, GlobalStyles.flexColumn]}>
      <HeaderXSSmallBlue onBack={onBack} isBackButton={false} title='ReferReach' />
      <SafeAreaView style={GlobalStyles.container} edges={['top']}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <Icon name='search' color={BASE_COLORS.eerieBlackColor} size={20} style={styles.iconSearch} />
              <TextInput placeholder='Search' value={textSearch} style={styles.input} onChangeText={onInputChange} />
            </View>
          </View>
          <ListItemsChat
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={onRefresh}
            data={chatData}
            changePage={() => {}}
            onItemClick={onItemClick}
          />
        </View>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default ChatScreen;
