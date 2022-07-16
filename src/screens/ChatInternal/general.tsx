import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View, Keyboard, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppRoute} from '~Root/navigation/AppRoute';

import {HeaderNormalBlue, Icon, Paragraph, ModalDialogCommon, Image} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {CHAT_MEMBER_ROLE, CHAT_MEMBER_STATUS, CHAT_TYPE} from '~Root/services/chat/types';
import {uploadImage} from '~Root/services/upload';
import {getChatMessageData, sendChatMessage, updateChatData} from '~Root/services/chat/actions';
import ChatMessages from '~Root/components/ChatMessages';
import {SocketContext} from '~Root/services/socket/context';
import {emitJoinRoom, emitLeftRoom} from '~Root/services/socket/emit';
import {listenError} from '~Root/services/socket/listen';
import Toast from 'react-native-toast-message';
import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UserAvatar from '~Root/components/UserAvatar';

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

const ChatGeneralInternalScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const {chatInfo, messagePagination, chatPagination, chatData} = useSelector((state: IGlobalState) => state.chatState);
  if (!chatInfo) {
    navigation.goBack();
  }
  const currentUser = chatInfo?.members?.find(member => member.userCode === userInfo.code);
  const withUser = chatInfo?.members?.find(member => member.userCode !== userInfo.code);
  const {socket} = useContext(SocketContext);
  const [visibleModal, setVisibleModal] = useState(false);

  const onBack = () => {
    navigation.goBack();
  };

  const onInputChange = (text: string) => {
    setMessage(text);
  };

  const getChatMessage = () => {
    if (!chatInfo) return;
    dispatch(getChatMessageData(chatInfo.code, messagePagination.pageCurrent, messagePagination.recordPerPage));
    emitJoinRoom(socket, chatInfo.code);
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
    navigation.navigate(AppRoute.CHAT_CONTEXT_SWITCH, {code: withUser?.userCode});
  };

  const onUpdateAttachments = () => {
    setVisibleModal(!visibleModal);
  };

  const onButtonPress = useCallback(async (type, options) => {
    setVisibleModal(false);
    if (type === 'capture') {
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
    if (chatInfo.type !== CHAT_TYPE.GENERAL) return;
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
    getChatMessage();
    clearNewMessageCount();
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

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderNormalBlue onBack={onBack} isBackButton={false}>
        <TouchableOpacity onPress={onBack} style={[styles.closeBtn, GlobalStyles.mr10, GlobalStyles.mt10]}>
          <Icon name='times' size={adjust(15)} color={BASE_COLORS.whiteColor} />
        </TouchableOpacity>
        <View style={[GlobalStyles.flexRow, GlobalStyles.ph15]}>
          <TouchableOpacity
            onPress={goToContextSwitch}
            style={[GlobalStyles.avatarContainer, GlobalStyles.mr10, GlobalStyles.mt10]}>
            <Image source={IMAGES.iconChatHamburger} style={styles.hamburger} />
          </TouchableOpacity>
          <View style={GlobalStyles.mr10}>
            <UserAvatar user={withUser?.user} size={60} imageSize={80} />
          </View>
          <View style={GlobalStyles.flexColumn}>
            <Paragraph
              bold600
              textWhite
              h3
              title={`${withUser?.user?.firstName ?? ''} ${withUser?.user?.lastName ?? ''}`.toUpperCase()}
              style={GlobalStyles.mb15}
            />
          </View>
        </View>
      </HeaderNormalBlue>
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
              <TextInput placeholder='Message' value={message} style={[styles.input]} onChangeText={onInputChange} />
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

export default React.memo(ChatGeneralInternalScreen);
