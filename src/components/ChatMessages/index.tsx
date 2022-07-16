import React, {useContext, useEffect, useRef, useState} from 'react';
import {Animated, FlatList, RefreshControl, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import ChatMessage from '../ChatMessage';
import {IMessage} from '~Root/services/chat/types';
import {getChatMessageData, receiveChatMessage, updateLastChatMessage} from '~Root/services/chat/actions';
import {listenNewMessage} from '~Root/services/socket/listen';
import {SocketContext} from '~Root/services/socket/context';

const ChatMessages = () => {
  const {messages} = useSelector((state: IGlobalState) => state.chatState);
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const {chatInfo, messagePagination} = useSelector((state: IGlobalState) => state.chatState);
  const dispatch = useDispatch();
  const scrollAnim = new Animated.Value(0);
  const flatListRef = useRef<FlatList>(null);
  const {socket} = useContext(SocketContext);

  const onEndReached = () => {
    if (!chatInfo) return;
    const page = parseInt(messagePagination.pageCurrent ?? 1, 10) + 1;
    const limit = messagePagination?.recordPerPage ?? 50;
    dispatch(getChatMessageData(chatInfo.code, page, limit));
  };

  useEffect(() => {
    listenNewMessage(socket, (message: IMessage) => {
      if (chatInfo && message.message) {
        dispatch(updateLastChatMessage(chatInfo.code, message.message));
      }
      dispatch(receiveChatMessage(message));
      if (!flatListRef?.current) return;
      flatListRef.current.scrollToOffset({animated: false, offset: 0});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <View style={styles.container as ViewStyle}>
      <Animated.FlatList
        ref={flatListRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={1}
        inverted={true}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollAnim,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={true}
        data={messages}
        key={'block'}
        onEndReached={onEndReached}
        keyExtractor={(item, index) => `block-${item.code}-${index}`}
        renderItem={({item}: {item: IMessage}) => (
          <ChatMessage item={item} isSameUser={item.userCode === userInfo.code} key={item.code} />
        )}
      />
    </View>
  );
};

export default React.memo(ChatMessages);
