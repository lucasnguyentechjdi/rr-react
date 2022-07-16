/* eslint-disable @typescript-eslint/promise-function-async */
import React, { useCallback, useState } from 'react';
import { PermissionsAndroid, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { setUserProfileAvatar } from '~Root/services/user/actions';
import { GlobalStyles } from '~Root/config';
import { HeaderProfileBlue, ModalDialogCommon, Paragraph } from '~Root/components';
import styles from './styles';
import { IUserState } from '~Root/services/user/types';
import { useDispatch, useSelector } from 'react-redux';
import { IGlobalState } from '~Root/types';
import { DOWNLOAD_IMAGE_URL } from '~Root/private/api';

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
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];

interface Props {
  onBack: () => void;
  isBackButton?: boolean;
  children?: React.ReactNode;
}

const ProfileTemplateScreen: React.FC<Props> = ({ onBack = () => { }, isBackButton = false, children }) => {
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);

  const onUpdate = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        dispatch(
          setUserProfileAvatar({
            name: response?.assets[0]?.fileName,
            type: response?.assets[0]?.type,
            uri: response?.assets[0]?.uri,
          }),
        );
      }
    }
  };

  const getAvatar = () => {
    if (userState?.userInfo?.avatar.includes('file://')) {
      return userState?.userInfo?.avatar;
    }
    if (userState?.userInfo?.avatar) {
      return DOWNLOAD_IMAGE_URL(userState?.userInfo?.avatar);
    }
    return undefined;
  };
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <>
          <HeaderProfileBlue
            isBackButton={isBackButton}
            profilePhoto={getAvatar()}
            onBack={onBack}
            onUpdate={onUpdate}
          />
          <ScrollView
            style={[styles.scrollViewWhite]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={GlobalStyles.scrollViewContentContainer}
          >
            {children}
          </ScrollView>
        </>
      </SafeAreaView>
      {visibleModal && (
        <ModalDialogCommon isVisible={visibleModal} onHideModal={onUpdate} isDefault={false}>
          {actions.map(({ title, type, options }) => (
            <TouchableOpacity key={type} onPress={() => onButtonPress(type, options)} style={styles.imageButton}>
              <Paragraph h5 title={title} />
            </TouchableOpacity>
          ))}
        </ModalDialogCommon>
      )}
    </View>
  );
};

export default ProfileTemplateScreen;
