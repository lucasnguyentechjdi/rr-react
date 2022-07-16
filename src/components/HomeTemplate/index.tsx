/* eslint-disable @typescript-eslint/restrict-template-expressions */

import * as RootNavigation from '~Root/navigation/RootNavigation';

import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Button, ButtonSecond, HeaderNormalBlue, Icon, Image, Paragraph } from '~Root/components';
import React, { useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { AppRoute } from '~Root/navigation/AppRoute';
import { IUser } from '~Root/services/user/types';
import LogoutIcon from './logoutIcon';
import { ModalDialogCommon } from '~Root/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { adjust } from '~Root/utils';
import { destroyData } from '~Root/services/ask/actions';
import { imageUrl } from '~Root/services/upload';
import { logout } from '~Root/services/auth/actions';
import { onLogout } from '~Root/services/user/actions';
import { socketDestroy } from '~Root/services/socket/context';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface Props {
  onBack: () => void;
  onProfile: () => void;
  onEdit: () => void;
  isBackButton: boolean;
  containerHeaderStyle?: ViewStyle;
  profile?: IUser | null;
  children?: React.ReactNode;
  navigation?: any;
  showLogout?: boolean;
}

const HomeTemplateScreen: React.FC<Props> = ({
  onBack = () => { },
  onProfile = () => { },
  onEdit = () => { },
  isBackButton = false,
  containerHeaderStyle = {},
  profile,
  children,
  showLogout = true,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(onLogout());
    dispatch(destroyData());
    socketDestroy();
  };

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  const getUserName = () => {
    const firstName = profile?.firstName ?? '';
    const lastName = profile?.lastName ?? '';
    return `${firstName} ${lastName}`;
  };

  const checkProfileTitle = (title: string | undefined) => {
    if (profile?.title) {
      return true;
    }
    return false;
  };

  const onShowVersion = () => {
    Toast.show({
      position: 'bottom',
      type: 'info',
      text1: '1.0.0',
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderNormalBlue onBack={onBack} isBackButton={isBackButton} containerHeaderStyle={containerHeaderStyle}>
        <TouchableOpacity
          style={[GlobalStyles.avatarContainer, styles.headerContent]}
          onLongPress={onShowVersion}
          onPress={onProfile}>
          <View style={[GlobalStyles.flexRow, styles.headerWrapper]}>

            {profile?.avatar ? (
              <Image source={{ uri: imageUrl(profile?.avatar) }} style={styles.imageProfile} />
            ) : (
              <Icon name='user-circle' size={80} color={BASE_COLORS.blackColor} style={GlobalStyles.avatar} />
            )}
            <View style={[styles.userInfoArea, GlobalStyles.ml10, { flex: 8 }]}>
              <Paragraph p bold600 textWhite title={getUserName()} style={[GlobalStyles.mb5, styles.title]} />
              {checkProfileTitle(profile?.title) && (
                <Paragraph p textWhite title={profile?.title} style={[GlobalStyles.mb20, styles.title, styles.biztype]} />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {showLogout && (
          <TouchableOpacity onPress={onShowModal}>
            <View style={styles.logoutIcon}>
              <LogoutIcon />
            </View>
          </TouchableOpacity>
        )}
      </HeaderNormalBlue>
      <View style={styles.areaViewContainer}>
        <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
          {children}
        </SafeAreaView>
      </View>
      {showModal && (
        <ModalDialogCommon
          isVisible={showModal}
          onHideModal={onShowModal}
          isDefault={false}
          styleModal={styles.styleModal}
          styleModalContainer={styles.styleModalContainer}>
          <Paragraph h5 bold600 title={t('logout')} style={GlobalStyles.pv20} />
          <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
            <Button
              isIconLeft={true}
              title={t('cancel')}
              bordered
              h3
              textCenter
              onPress={onShowModal}
              containerStyle={styles.cancelButtonArea}
              textStyle={styles.textStyle}
            />
            <Button
              bordered
              title={t('confirm')}
              onPress={handleLogout}
              containerStyle={styles.mainButtonArea}
              textStyle={styles.mainButtonTextStyle}
              textWhite
            />
          </View>
        </ModalDialogCommon>
      )}
    </View>
  );
};

export default HomeTemplateScreen;
