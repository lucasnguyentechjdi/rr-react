import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {CHAT_MEMBER_ROLE, CHAT_MEMBER_STATUS, CHAT_TYPE} from '~Root/services/chat/types';
import {HeaderNormalBlue, Icon, Image, ModalDialogCommon, Paragraph} from '~Root/components';
import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Keyboard, PermissionsAndroid, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {emitJoinRoom, emitLeftRoom} from '~Root/services/socket/emit';
import {getChatMessageData, sendChatMessage, updateChatData} from '~Root/services/chat/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import ChatAskInfo from './askInfo';
import ChatMessages from '~Root/components/ChatMessages';
import {IGlobalState} from '~Root/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SocketContext} from '~Root/services/socket/context';
import Toast from 'react-native-toast-message';
import UserAvatar from '~Root/components/UserAvatar';
import {adjust} from '~Root/utils';
import {listenError} from '~Root/services/socket/listen';
import {setAskSelected} from '~Root/services/ask/actions';
import styles from './styles';
import {uploadImage} from '~Root/services/upload';
import Header from './header';
import ChatAPI from '~Root/services/chat/apis';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.CHAT_INTERNAL>;

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}
const includeExtra = true;

const actions: Action[] = [
  {
    title: 'Take photo...',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Choose from Library',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];

const ChatInternalScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const {chatInfo, askInfo, messagePagination, chatData, chatPagination} = useSelector(
    (state: IGlobalState) => state.chatState,
  );
  if (!chatInfo) {
    navigation.goBack();
  }
  const currentUser = chatInfo?.members.find(member => member.userCode === userInfo.code);
  const asker = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.ASKER);
  const responder = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.RESPONDER);
  const introducer = chatInfo?.members.find(member => member.role === CHAT_MEMBER_ROLE.INTRODUCER);
  const {socket} = useContext(SocketContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const [showAsk, setShowAsk] = useState(true);
  const [notification, setNotification] = useState<any>(false);
  const [totalNewMessage, setTotalNewMessage] = useState(0);
  const [totalNotification, setTotalNotification] = useState(0);

  const userChatShow = currentUser?.role === CHAT_MEMBER_ROLE.ASKER ? responder : asker;

  const onBack = () => {
    navigation.goBack();
  };

  const getNewMessageCount = async () => {
    if (!userChatShow?.userCode) return;
    const {data} = await ChatAPI.getTotalNewMessageCountWithUser(userChatShow?.userCode);
    if (data) {
      setTotalNewMessage(data.total - (currentUser?.newMessageCount ?? 0));
    }
  };

  const getTotalNotification = (notification: any) => {
    let total = 1;
    if (asker?.status !== CHAT_MEMBER_STATUS.PENDING) {
      total++;
    }
    if (responder?.status !== CHAT_MEMBER_STATUS.PENDING) {
      total++;
    }
    if (askInfo?.isEnd) {
      total++;
    }
    if (notification.readCount) {
      total -= notification.readCount;
    }
    if (total < 0) {
      total = 0;
    }
    setTotalNotification(total);
  };

  const onNotification = async () => {
    setTotalNotification(0);
    if (notification?.code) {
      await ChatAPI.updateNotificationReadCount(notification.code, totalNotification);
    }
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

  const getNotification = async () => {
    const result = await ChatAPI.getNotification(chatInfo?.code);
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
    console.log(result.data);
    setNotification(result.data);
    getTotalNotification(result.data);
  };

  const onViewAsk = () => {
    setShowAsk(!showAsk);
  };

  const onInputChange = (text: string) => {
    setMessage(text);
  };

  const getChatMessage = () => {
    if (!chatInfo) return;
    dispatch(getChatMessageData(chatInfo.code, messagePagination.pageCurrent, messagePagination.recordPerPage));
    emitJoinRoom(socket, chatInfo.code);
  };

  const roleText = () => {
    if (currentUser?.role === CHAT_MEMBER_ROLE.ASKER) {
      return 'You are asking';
    }
    if (currentUser?.role === CHAT_MEMBER_ROLE.RESPONDER) {
      return 'You are responding to';
    }
    if (currentUser?.role === CHAT_MEMBER_ROLE.INTRODUCER) {
      return 'You are introducing to';
    }
    return '';
  };

  const onSendMessage = async () => {
    if (!chatInfo) return;
    dispatch(
      sendChatMessage(chatInfo?.code, message, [], (res: any) => {
        if (!res.success) {
          Toast.show({
            position: 'top',
            type: 'error',
            text1: res.message,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      }),
    );
    setMessage('');
  };

  const keyboardDidShow = (event: any) => {
    if (Platform.OS === 'android') return;
    setKeyboardOffset(event.endCoordinates.height);
  };

  const keyboardDidHide = () => {
    setKeyboardOffset(0);
  };

  const goToContextSwitch = () => {
    navigation.navigate(AppRoute.CHAT_CONTEXT_SWITCH, {code: userChatShow?.userCode});
  };

  const onUpdateAttachments = () => {
    setVisibleModal(!visibleModal);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onButtonPress = useCallback(async (type, options) => {
    setVisibleModal(false);
    if (type === 'capture') {
      await requestCameraPermission();
      await launchCamera(options, imageResponse);
    } else {
      await launchImageLibrary(options, imageResponse);
    }
  }, []);

  const imageResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      if (response?.assets?.length > 0) {
        console.log(response?.assets);
        void onSendAttachments(response?.assets);
      }
    }
  };

  const onSendAttachments = async (assets: any) => {
    if (!chatInfo) return;
    const attachments: any[] = [];
    const promiseArray: any[] = [];
    assets.forEach(async (item: any) => {
      const dataForm = new FormData();
      dataForm.append('file', {
        name: item.fileName,
        type: item.type,
        uri: Platform.OS === 'ios' ? item?.uri && item?.uri.replace('file://', '') : item.uri,
      });
      promiseArray.push(uploadImage(dataForm));
    });
    const images = await Promise.all(promiseArray);
    images.forEach(item => {
      if (!item?.data?.url) return;
      attachments.push(item.data.url);
    });
    if (attachments.length > 0) {
      dispatch(
        sendChatMessage(chatInfo?.code, '', attachments, (res: any) => {
          if (!res.success) {
            Toast.show({
              position: 'top',
              type: 'error',
              text1: res.message,
              visibilityTime: 3000,
              autoHide: true,
            });
          }
        }),
      );
    }
  };

  const onFocusInput = () => {
    if (showAsk) {
      setShowAsk(false);
    }
  };

  const clearNewMessageCount = () => {
    if (!chatInfo?.code) return;
    const chatIndex = chatData.findIndex(item => item.code === chatInfo.code);
    if (chatIndex === -1) return;
    const memberIndex = chatData[chatIndex].members.findIndex(member => member.userCode === userInfo.code);
    chatData[chatIndex].members[memberIndex].newMessageCount = 0;
    dispatch(updateChatData({data: chatData, chatPagination}));
  };

  useEffect(() => {
    if (!chatInfo) return;
    if (chatInfo.type === CHAT_TYPE.GENERAL) return;
    if (!socket && !socket.connected) {
      Toast.show({
        position: 'top',
        type: 'error',
        text1: 'Connect to server failed',
        text2: 'Connect to server chat failed! Please try again or reopen app',
        visibilityTime: 3000,
        autoHide: true,
      });
      onBack();
      return;
    }
    if (asker?.status === CHAT_MEMBER_STATUS.PENDING || responder?.status === CHAT_MEMBER_STATUS.PENDING) {
      void onNotification();
      return;
    }
    void getNotification();
    void getNewMessageCount();
    clearNewMessageCount();
    getChatMessage();
    listenError(socket, (data: any) => {
      console.error(data);
    });
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      emitLeftRoom(socket, chatInfo?.code);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatInfo]);

  useEffect(() => {
    if (askInfo) {
      dispatch(setAskSelected(askInfo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askInfo]);

  return (
    <View style={GlobalStyles.containerWhite}>
      {chatInfo?.type !== CHAT_TYPE.NETWORK && introducer && (
        <TouchableOpacity onPress={onNotification}>
          <View style={[GlobalStyles.flexRow, styles.notificationContainer]}>
            <View style={[styles.notificationBlock]}>
              <Text style={[styles.textNotification]}>Notifications</Text>
              {totalNotification > 0 && (
                <View style={styles.notificationCount}>
                  <Paragraph
                    p
                    textWhite
                    title={totalNotification.toString()}
                    style={styles.countNotificationText}
                    numberOfLines={1}
                  />
                </View>
              )}
            </View>

            <Icon name='sort-down' size={adjust(20)} color={BASE_COLORS.whiteColor} style={GlobalStyles.mb10} />
          </View>
        </TouchableOpacity>
      )}
      <View style={[GlobalStyles.fullWidth, GlobalStyles.ph30, GlobalStyles.pv20, styles.chatInternalHeader]}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.alignCenter, GlobalStyles.mb10]}>
          <TouchableOpacity onPress={onBack}>
            <Image source={IMAGES.iconBack} style={GlobalStyles.iconBack} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToContextSwitch}
            style={[GlobalStyles.avatarContainer, GlobalStyles.mr10, GlobalStyles.mt10]}>
            <Image source={IMAGES.iconChatHamburger} style={styles.hamburger} />
          </TouchableOpacity>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
          <View>
            <UserAvatar user={userChatShow?.user} size={60} imageSize={80} />
          </View>
          <View style={styles.chatUserInfo}>
            <Paragraph
              bold600
              textWhite
              h4
              title={`${userChatShow?.user?.firstName ?? ''} ${userChatShow?.user?.lastName ?? ''}`.toUpperCase()}
            />
            <Paragraph textWhite h5 title={`${userChatShow?.user?.title}`} />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onViewAsk}>
        <View style={[GlobalStyles.flexRow, styles.viewAskContainer]}>
          <Paragraph
            bold600
            textEerieBlackColor
            title='View Ask'
            style={[GlobalStyles.container, styles.textViewAsk]}
          />
          <Icon
            name={showAsk ? 'sort-up' : 'sort-down'}
            size={adjust(16)}
            color={BASE_COLORS.whiteColor}
            style={showAsk ? GlobalStyles.mt5 : GlobalStyles.mb5}
          />
        </View>
      </TouchableOpacity>
      {showAsk && askInfo && <ChatAskInfo navigation={navigation} roleText={roleText()} />}
      <View style={[GlobalStyles.container, styles.relativeBlock]}>
        <SafeAreaView style={[GlobalStyles.container, styles.relativeBlock]} edges={['right', 'left']}>
          <View style={styles.contentContainer}>
            <ChatMessages />
          </View>
          <View
            style={[
              GlobalStyles.flexRow,
              styles.messageContainer,
              {
                marginBottom: keyboardOffset,
              },
            ]}>
            <TouchableOpacity onPress={onUpdateAttachments}>
              <Icon name='paperclip' size={adjust(12)} color={BASE_COLORS.whiteColor} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Message'
                onFocus={onFocusInput}
                value={message}
                style={[styles.input]}
                onChangeText={onInputChange}
              />
            </View>
            <TouchableOpacity onPress={onSendMessage}>
              <Icon name='paper-plane' size={adjust(12)} color={BASE_COLORS.whiteColor} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      {visibleModal && (
        <ModalDialogCommon isVisible={visibleModal} onHideModal={onUpdateAttachments} isDefault={false}>
          {actions.map(({title, type, options}) => (
            <TouchableOpacity key={type} onPress={() => onButtonPress(type, options)} style={styles.imageButton}>
              <Paragraph h5 title={title} />
            </TouchableOpacity>
          ))}
        </ModalDialogCommon>
      )}
    </View>
  );
};

export default React.memo(ChatInternalScreen);
