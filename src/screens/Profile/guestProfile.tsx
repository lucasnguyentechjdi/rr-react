import { GlobalStyles } from '~Root/config';
import { Button, Loading, ModalDialogCommon, Paragraph } from '~Root/components';
import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { AppRoute } from '~Root/navigation/AppRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import ProfileBlockView from '~Root/components/ProfileBlock/view';
import GuestHomeTemplateScreen from '~Root/components/HomeTemplate/guest';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInviteData, getUserNetworkData, onRevokeInvite } from '~Root/services/user/actions';
import { IGlobalState } from '~Root/types';
import { removeInvite } from '~Root/services/invite';
import { removeNetwork } from '~Root/services/network';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.GUEST_PROFILE>;

const GuestProfileScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { userInfo } = route.params;
  const dispatch = useDispatch();
  const { invokeInvite, networks } = useSelector((state: IGlobalState) => state.userState);
  const checkIsNetwork = networks.find(item => item.userCode === userInfo.code);
  const [confirmVisible, showConfirm] = useState(false);

  const onBack = () => {
    navigation.goBack();
  };

  const onRemoveUser = () => {
    dispatch(onRevokeInvite({ ...userInfo, userCode: userInfo.code, type: 'network' }));
    showConfirm(true);
  };

  const onCancel = () => {
    showConfirm(false);
  };

  const onPressConfirm = async () => {
    let result: any = false;
    let text = t('revoke_success');
    if (invokeInvite?.type === 'invite') {
      result = await removeInvite(invokeInvite?.code ?? '');
    }
    if (invokeInvite?.type === 'network') {
      result = await removeNetwork(invokeInvite?.userCode ?? '');
      text = t('remove_network_success');
    }
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? text : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      dispatch(onRevokeInvite(null));
      dispatch(getUserInviteData());
      dispatch(getUserNetworkData(userInfo?.isSuggest));
      showConfirm(false);
      onBack();
    }
  };

  return (
    <>
      <GuestHomeTemplateScreen profile={userInfo} containerHeaderStyle={GlobalStyles.containerHeaderStyle}>
        <View style={GlobalStyles.flexColumn}>
          <View style={styles.userInfoContainer}>
            <Paragraph
              h5
              title={userInfo.introduction}
              style={[styles.defaultTextColor, GlobalStyles.mt15, styles.description]}
            />
          </View>
          <View style={styles.cardContainer}>
            <ProfileBlockView userInfo={userInfo} />
          </View>
          <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
            <Button
              title={t('go_back')}
              bordered
              h3
              textCenter
              onPress={onBack}
              containerStyle={styles.buttonContainerStyle}
              textStyle={styles.h5BoldDefault}
            />
            {checkIsNetwork && (
              <Button
                title={t('remove_user')}
                bordered
                h3
                textCenter
                onPress={onRemoveUser}
                containerStyle={styles.buttonRemoveContainerStyle}
                textStyle={styles.h5BoldDefault}
              />
            )}
          </View>
        </View>
        <ModalDialogCommon
          isVisible={confirmVisible}
          onHideModal={onCancel}
          isDefault={false}
          styleModal={GlobalStyles.styleModal}
          styleModalContainer={GlobalStyles.styleModalContainer}>
          <View style={[GlobalStyles.pv20, GlobalStyles.ph15]}>
            <View style={GlobalStyles.modalHeader}>
              {invokeInvite?.type !== 'invite' && (
                <>
                  <View style={GlobalStyles.flexRow}>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInvite]}>
                      Are you sure you want to remove&nbsp;
                    </Text>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInviteHighlight]}>
                      {`${invokeInvite?.user?.firstName ?? ''} ${invokeInvite?.user?.lastName ?? ''}`}
                    </Text>
                  </View>
                  <View style={GlobalStyles.flexRow}>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInvite]}>From your&nbsp;</Text>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInviteHighlight]}>Trust Network</Text>
                  </View>
                </>
              )}
              {invokeInvite?.type === 'invite' && (
                <>
                  <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInvite]}>
                    Are you sure you want to revoke&nbsp;
                  </Text>
                  <View style={GlobalStyles.flexRow}>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInviteHighlight]}>
                      {invokeInvite?.name}
                    </Text>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInvite]}>&nbsp;invite?</Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.buttonGroupModal}>
              <Button
                bordered
                title={t('cancel')}
                onPress={onCancel}
                containerStyle={styles.cancelButtonArea}
                textStyle={styles.textStyle}
              />
              <Button
                bordered
                title={t('confirm')}
                onPress={onPressConfirm}
                containerStyle={styles.mainButtonArea}
                textStyle={styles.textStyle}
              />
            </View>
          </View>
        </ModalDialogCommon>
      </GuestHomeTemplateScreen>
      <Loading />
    </>
  );
};

export default GuestProfileScreen;
