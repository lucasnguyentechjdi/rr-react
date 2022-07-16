import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BlockItems, Button, Icon, ModalDialogCommon, Paragraph } from '~Root/components';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { getAskDetail, viewDetailChat } from '~Root/services/chat/actions';
import { IInvite, INVITE_STATUS } from '~Root/services/invite/types';
import { getUserInviteData, getUserNetworkData, onRevokeInvite, removeSuggestion } from '~Root/services/user/actions';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import ModalInvite from '~Root/components/ModalInvite';
import { AppRoute } from '~Root/navigation/AppRoute';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import { IChat } from '~Root/services/chat/types';
import { removeInvite } from '~Root/services/invite';
import { removeNetwork } from '~Root/services/network';
import { IGlobalState } from '~Root/types';
import { adjust } from '~Root/utils';
import styles from './styles';
import UserAPI from '~Root/services/user/apis';

interface INetwork {
  invokeInvite: IInvite | null;
  invitesLeft: number;
  showTooltip: boolean;
  onPress: () => void;
  onTooltipPress: () => void;
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, AppRoute.TRUST>;
}

interface Props {
  contentProps: INetwork;
  tabLabel?: number;
}

const TrustNetwork: React.FC<Props> = ({
  contentProps: { invokeInvite, invitesLeft = 0, showTooltip = false, onPress, onTooltipPress, navigation },
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userState = useSelector((state: IGlobalState) => state.userState);

  const [isSuggestModal, setIsSuggestModal] = useState(false);

  const [confirmVisible, showConfirm] = useState({
    visibleButton: false,
    visibleModal: false,
  });
  const [openModal, setOpenModal] = useState(false);

  const onEdit = () => {
    showConfirm({ ...confirmVisible, visibleButton: !confirmVisible.visibleButton });
  };

  const onConfirm = (item: any) => {
    if (item) {
      dispatch(onRevokeInvite(item));
    }
    showConfirm({ ...confirmVisible, visibleModal: false });
  };

  const onPending = (item?: IInvite) => {
    console.log(item);
    if (item) {
      dispatch(onRevokeInvite(item));
      navigation.navigate(AppRoute.INVITE_CONTACT_EDIT);
    }
  };

  const onCancel = () => {
    showConfirm({ ...confirmVisible, visibleModal: false });
    setIsSuggestModal(false);
  };

  const showModalRejectSuggestion = () => {
    setIsSuggestModal(true);
    showConfirm({ ...confirmVisible, visibleModal: true });
  }

  const handleSuggest = async (payload: { isAccepted: boolean }) => {
    const result: any = await UserAPI.handleSuggestConnection(payload);
    let text = t('add_success');
    if (result.success && !payload.isAccepted) {
      text = t('remove_suggestion');
    }
    dispatch(getUserNetworkData(false));
    dispatch(getUserInviteData());
    dispatch(removeSuggestion());
    onCancel();
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? text : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
  }

  const onPressConfirm = async () => {
    if (isSuggestModal) {
      handleSuggest({ isAccepted: false });
      return;
    }
    let result: any = false;
    console.log(invokeInvite);
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
      dispatch(getUserNetworkData(false));
      showConfirm({ ...confirmVisible, visibleModal: !confirmVisible.visibleModal });
    }
  };

  const networkData = () => {
    const invites = userState.invites
      .filter((item: IInvite) => item.status === INVITE_STATUS.NEW)
      .map((item: IInvite) => ({ ...item, type: 'invite' }));
    const networks = userState.networks.map((item: any) => {
      return {
        ...item,
        status: INVITE_STATUS.APPROVED,
        type: 'network',
      };
    });
    return [...networks, ...invites]
  }

  useEffect(() => {

  })

  const checkInviteLeft = () => {
    const totalInvited = userState.invites.filter(item => item.status !== 'approved').length;
    if (totalInvited >= 10) {
      return 0;
    }
    return 10 - totalInvited;
  };

  const onInvite = () => {
    if (!checkInviteLeft()) {
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('notify_full_trust_network'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    navigation.navigate(AppRoute.INVITE_CONTACT);
  };

  const onClaim = () => {
    navigation.navigate(AppRoute.CLAIM_CODE);
  };

  const onChat = (chatInfo: IChat) => {
    dispatch(viewDetailChat(chatInfo));
    dispatch(getAskDetail(chatInfo.askCode));
    navigation.navigate(AppRoute.CHAT_GENERAL_INTERNAL, { chatInfo: chatInfo });
  };

  const onInviteAction = () => {
    onInvite();
    setOpenModal(false);
  };

  const onItemClick = (item: IInvite) => {
    if (!item.user) return;
    navigation.push(AppRoute.GUEST_PROFILE, { userInfo: item.user });
  };

  return (
    <>
      <View style={styles.networkContainer}>
        <View style={[styles.askHeader]}>
          <Paragraph h4 title={t('your_trust_network')} style={[styles.titleBlue]} />
          <Tooltip
            isVisible={showTooltip}
            backgroundColor='transparent'
            contentStyle={[styles.tooltipContentStyle]}
            tooltipStyle={[styles.tooltipStyle]}
            content={
              <TouchableOpacity style={GlobalStyles.flexColumn} onPress={onTooltipPress}>
                <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                  <Paragraph h4 textWhite title={t('trust_network')} style={styles.titleNetwork} />
                  <TouchableOpacity style={styles.tooltipCloseBtn} onPress={onTooltipPress}>
                    <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(12)} />
                  </TouchableOpacity>
                </View>
                <View style={styles.tooltipNetwork}>
                  <Paragraph
                    p
                    title='Invite your friends into your Trust Network to start building new connections.'
                    style={styles.tooltipTextColor}
                  />
                </View>
              </TouchableOpacity>
            }
            placement='bottom'>
            <TouchableOpacity style={styles.tooltipMargin} onPress={onTooltipPress}>
              <Ionicons name='help-circle' color={BASE_COLORS.davysGreyColor} size={adjust(22)} />
            </TouchableOpacity>
          </Tooltip>

          <TouchableOpacity onPress={onInviteAction}>
            <View style={styles.inviteLeftArea}>
              <Paragraph textWhite title={`${invitesLeft} ${t('invites_left')}`} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[GlobalStyles.flexColumn]}>
          <BlockItems
            data={networkData()}
            onConfirm={onConfirm}
            onPending={onPending}
            onItemClick={onItemClick}
            onChat={onChat}
            isVisible={confirmVisible.visibleButton}
            isSuggest={userState.userInfo?.isSuggest}
            handleSuggestConnection={handleSuggest}
            showModalRejectSuggestion={showModalRejectSuggestion}
          />
        </View>
        <View style={styles.mainButtonContainer}>
          <Button
            bordered
            title={t('invite')}
            onPress={() => setOpenModal(true)}
            containerStyle={styles.mainButtonArea}
            textStyle={styles.textStyle}
          />
        </View>
        <ModalDialogCommon
          isVisible={confirmVisible.visibleModal}
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
                      {isSuggestModal ? 'Reject this suggestion?' : 'Are you sure you want to remove'}&nbsp;
                    </Text>
                    <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInviteHighlight]}>
                      {`${invokeInvite?.user?.firstName ?? ''} ${invokeInvite?.user?.lastName ?? ''}`}
                    </Text>
                  </View>
                  <View style={GlobalStyles.flexRow}>
                    {!isSuggestModal &&
                      <>
                        <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInvite]}>From your&nbsp;</Text>
                        <Text style={[GlobalStyles.inlineText, GlobalStyles.textRevokeInviteHighlight]}>Trust Network</Text>
                      </>
                    }
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
            <View style={styles.buttonGroup}>
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
      </View>
      {openModal && <ModalInvite onInvite={onInvite} onClaim={onClaim} onHideModal={() => setOpenModal(false)} />}
    </>
  );
};
export default React.memo(TrustNetwork);
