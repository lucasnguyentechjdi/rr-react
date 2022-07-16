import React, {useRef, useState} from 'react';
import {Share, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import PhoneInput from 'react-native-phone-number-input';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {Button, InviteContactTemplateScreen, ModalDialogCommon, Paragraph} from '~Root/components';
import {IUserState} from '~Root/services/user/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {IGlobalState} from '~Root/types';
import {GlobalStyles} from '~Root/config';
import styles from './styles';
import {getUserInviteData, onRevokeInvite} from '~Root/services/user/actions';
import {refreshInvite, removeInvite} from '~Root/services/invite';
import Toast from 'react-native-toast-message';
import { buildShareInviteLink } from '~Root/utils/link';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONTACT_EDIT>;

const InviteContactEditScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {invokeInvite}: IUserState = useSelector((state: IGlobalState) => state.userState);
  const [visibleModal, setVisibleModal] = useState(false);

  const phoneInput = useRef<PhoneInput>(null);

  const onBack = () => {
    navigation.goBack();
  };

  const onRevoke = () => {
    setVisibleModal(!visibleModal);
  };

  const onHideModal = () => {};

  const onNewInvite = async () => {
    if (!invokeInvite?.code) onBack();
    const result = await refreshInvite(invokeInvite?.code ?? '');
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('new_invite_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    const code: string = result.data ?? '';
    await Share.share({
      message: await buildLink(code),
    });
    dispatch(onRevokeInvite(null));
    dispatch(getUserInviteData());
    setVisibleModal(false);
    onBack();
  };

  const buildLink = async (code: string) => {
    return await buildShareInviteLink(code);
  };

  const onModalCancel = () => {
    setVisibleModal(false);
  };

  const onConfirm = async () => {
    if (!invokeInvite?.code) onBack();
    const result = await removeInvite(invokeInvite?.code ?? '');
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('revoke_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    dispatch(onRevokeInvite(null));
    dispatch(getUserInviteData());
    setVisibleModal(false);
    onBack();
  };

  return (
    <InviteContactTemplateScreen
      title={`${t('invite_into')} ${t('trust_network')}`}
      onBack={onBack}
      isBackButton={true}>
      <View style={GlobalStyles.mb55}>
        <Paragraph h4 textTealBlue textCenter bold title={t('invite_setting')} />
        <Paragraph h4 textTealBlue textCenter title={t('invite_link')} style={styles.description} />
      </View>
      <View style={GlobalStyles.flexColumn}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.mb30]}>
          <PhoneInput
            ref={phoneInput}
            value={invokeInvite?.phoneNumber}
            defaultCode={invokeInvite?.countryCode ?? undefined}
            layout='first'
            withDarkTheme
            disabled={true}
            autoFocus
            countryPickerButtonStyle={GlobalStyles.phoneCountryStyle}
            containerStyle={GlobalStyles.phoneContainerStyle}
            textContainerStyle={GlobalStyles.phoneTextContainerStyle}
            textInputStyle={GlobalStyles.phoneTextInputStyle}
            codeTextStyle={GlobalStyles.phoneCodeTextInputStyle}
          />
        </View>
        <View style={[GlobalStyles.blockGrey, GlobalStyles.p10, GlobalStyles.mb40, styles.blockGrey]}>
          <Paragraph p textEerieBlackColor title={t('invite_status')} style={[GlobalStyles.mb10, styles.content]} />
          <Paragraph
            p
            textSteelBlueColor
            title={`Send on ${moment(invokeInvite?.createdAt).format('MMM DD YYYY')}`}
            style={[GlobalStyles.mb10, styles.content]}
          />
          <Paragraph p textSteelBlueColor title={t('pending_invite')} style={styles.content} />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            bordered
            onPress={onNewInvite}
            title={t('send_new_invite_btn')}
            containerStyle={styles.mainButtonArea}
            textStyle={styles.textStyle}
          />
          <Paragraph title={t('send_new_invite')} style={styles.textNotes} />
          <Button
            bordered
            title={t('revoke_invite')}
            containerStyle={styles.cancelButtonArea}
            textStyle={styles.textStyle}
            onPress={onRevoke}
          />
          <Paragraph title={t('revoke_invite_link')} style={styles.textNotes} />
        </View>
      </View>
      <ModalDialogCommon
        isVisible={visibleModal}
        onHideModal={onHideModal}
        isDefault={false}
        styleModal={GlobalStyles.styleModal}
        styleModalContainer={GlobalStyles.styleModalContainer}>
        <View style={GlobalStyles.p30}>
          <Paragraph h5 textSteelBlueColor title={t('revoke_invite')} style={styles.header} />
          <View style={styles.modalHeader}>
            <Trans
              i18nKey='you_want_revoke'
              values={{
                name: invokeInvite?.name ?? '',
              }}
              components={{
                bold: <Text style={[GlobalStyles.p, GlobalStyles.textRevokeInviteHighlight]} />,
                italic: <Text style={[GlobalStyles.p, GlobalStyles.textRevokeInvite]} />,
              }}
            />
          </View>
          <Paragraph title={t('revoke_link')} style={styles.textNotes} />
          <View style={GlobalStyles.flexRow}>
            <Button
              bordered
              title={t('cancel')}
              onPress={onModalCancel}
              containerStyle={styles.modalCancelButtonArea}
              textStyle={styles.textStyle}
            />
            <Button
              bordered
              title={t('confirm')}
              onPress={onConfirm}
              containerStyle={styles.modalMainButtonArea}
              textStyle={styles.textStyle}
            />
          </View>
        </View>
      </ModalDialogCommon>
    </InviteContactTemplateScreen>
  );
};

export default InviteContactEditScreen;
