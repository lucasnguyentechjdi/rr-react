import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '~Root/navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {getAskDetail, getUserChatData, viewDetailChat} from '~Root/services/chat/actions';
import ChatAPI from '~Root/services/chat/apis';

const NotificationHandler = () => {
  const {chatInfo, chatPagination} = useSelector((state: IGlobalState) => state.chatState);
  const dispatch = useDispatch();

  const navigationToChat = async (data: any) => {
    const chatInfo = await ChatAPI.getChatInfo(data.chatCode);
    if (!chatInfo.data) return;
    dispatch(viewDetailChat(chatInfo.data));
    if (data.chatType === 'general') {
      RootNavigation.navigate(AppRoute.CHAT_GENERAL_INTERNAL, {chatInfo: chatInfo});
      return;
    }
    dispatch(getAskDetail(chatInfo.data.askCode));
    RootNavigation.navigate(AppRoute.CHAT_INTERNAL, {chatInfo: chatInfo.data});
  };

  useEffect(() => {
    console.log('Setup notification');
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened:', remoteMessage);
      if (remoteMessage?.data?.screen && remoteMessage?.data?.chatCode) {
        void navigationToChat(remoteMessage.data.chatCode);
      }
    });
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      if (remoteMessage?.data?.screen === 'chat' && remoteMessage?.data?.type === 'ask') {
        const page = 1;
        const limit = chatPagination.recordPerPage;
        dispatch(getUserChatData('', page, limit, 'refresh', (res: any) => {}));
      }
      if (remoteMessage?.data?.screen && remoteMessage?.data?.chatCode === chatInfo?.code) {
        return;
      }
      Toast.show({
        position: 'top',
        type: 'info',
        text1: remoteMessage.notification?.title ?? 'Notification',
        text2: remoteMessage.notification?.body,
        visibilityTime: 3000,
        autoHide: true,
        onPress: () => {
          if (remoteMessage?.data?.screen && remoteMessage?.data?.chatCode) {
            void navigationToChat(remoteMessage.data);
          }
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
export default NotificationHandler;
