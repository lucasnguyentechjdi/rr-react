import React from 'react';
import { Pressable, Share, TextInput, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SheetManager } from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';

import * as inviteActions from '~Root/services/invite/actions';
import { adjust } from '~Root/utils';
import { AppRoute } from '~Root/navigation/AppRoute';
import { BASE_COLORS, GlobalStyles, IMAGES } from '~Root/config';
import { buildShareInviteLink } from '~Root/utils/link';
import { Button, Icon, Loading, Maybe, Paragraph, Picker, Image } from '~Root/components';
import { IInvite } from '~Root/services/invite/types';
import { isRequestingSelector, massInviteCodeSelector } from '~Root/services/invite/selector';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import { TPickerSource } from '~Root/components/Picker/type';

import styles from './styles';
import {IUser, IUserState} from '~Root/services/user/types';
import {IGlobalState} from '~Root/types';

type OwnProps = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONTACT>;

const MassInvite: React.FC<OwnProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const massInviteCode: IInvite | undefined = useSelector(massInviteCodeSelector);
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const isRequesting: boolean = useSelector(isRequestingSelector);

  const [showShareQRCode, setShowShareQRCode] = React.useState<boolean>(false);
  const [maxInvite, setMaxInvite] = React.useState<number>();
  const [code, setCode] = React.useState<string>('default');
  const inviteSource: TPickerSource[] = [
    {
      title: '50',
      value: 50,
    },
    {
      title: '100',
      value: 100,
    },
  ];

  const handleCopyInviteCode = async () => {
    if (massInviteCode) {
      const { secretCode, code } = massInviteCode;
      const message = await buildShareInviteLink(secretCode);
      Clipboard.setString(message || code);

      Toast.show({
        position: 'bottom',
        type: 'success',
        text1: 'Copy Successfully!',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const handleCancelInvite = () => {
    if (massInviteCode) {
      SheetManager.hideAll();
      dispatch(inviteActions.cancelInvite.request(massInviteCode.secretCode));
    }
  };

  const handleShareQRCode = async () => {
    if (massInviteCode) {
      const { secretCode, code } = massInviteCode;
      const message = await buildShareInviteLink(secretCode);
      await Share.share({
        message: message || code,
      });
    }
  };

  const userName = () => {
    const { userInfo } = userState;
    return `${userInfo.firstName} ${userInfo.lastName}`;
  };

  const renderConfirmCancelBTS = () => (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.justifyCenter, styles.confirmCancelBts]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.justifyCenter]}>
        <Paragraph h5 textCenter title={t('cancel_invite_confirmation')} style={styles.confirmMessage} />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.justifyCenter]}>
        <Button
          title={t('cancel')}
          textCenter
          bordered
          onPress={() => SheetManager.hideAll()}
          containerStyle={styles.outlineBtnContainer}
          textStyle={styles.outlineBtn}
        />
        <Button
          title={t('yes')}
          textCenter
          bordered
          onPress={() => handleCancelInvite()}
          containerStyle={styles.containerBtnContainer}
          textStyle={styles.containerBtn}
        />
      </View>
    </View>
  );

  React.useEffect(() => {
    if (maxInvite) {
      dispatch(
        inviteActions.createInvite.request({
          maxUse: maxInvite,
        }),
      );
    }
  }, [maxInvite]);

  React.useEffect(() => {
    dispatch(inviteActions.fetchUserMassInvite.request());
  }, []);

  React.useEffect(() => {
    if (massInviteCode) {
      setCode(massInviteCode.code);
      return;
    }

    setMaxInvite(undefined);
  }, [massInviteCode]);

  return (
    <View>
      <Maybe cond={isRequesting}>
        <Loading />
      </Maybe>

      <Maybe cond={!isRequesting}>
        <Maybe cond={!(massInviteCode && massInviteCode.usesLeft)}>
          <Paragraph h5 textTealBlue textCenter title={t('generate_mass_invite_code')} style={styles.generateDes} />
          <Picker
            title={t('max_invite_use')}
            value={maxInvite}
            placeholder={t('max_invite_placeholder')}
            source={inviteSource}
            onChange={val => setMaxInvite(val as number)}
          />
        </Maybe>
        <Maybe cond={!!(massInviteCode && massInviteCode.usesLeft)}>
          <Maybe cond={!showShareQRCode}>
            <View style={[GlobalStyles.flexColumn, styles.massInviteContainer]}>
              <View>
                <Paragraph
                  h1
                  textTealBlue
                  textCenter
                  title={massInviteCode?.usesLeft?.toString() || ''}
                  style={[styles.useLeftCount]}
                />
                <Paragraph h5 textTealBlue textCenter title={t('left_invite_count')} style={[styles.useLeft]} />
                <Button
                  title={t('share_qr_code')}
                  textCenter
                  bordered
                  onPress={() => setShowShareQRCode(true)}
                  containerStyle={styles.shareBtnContainer}
                  textStyle={styles.shareBtn}
                />
                <View style={[GlobalStyles.flexRow, styles.copyCodeInput]}>
                  <TextInput style={[styles.inviteCode]} value={massInviteCode?.secretCode} editable={false} />
                  <Pressable onPress={handleCopyInviteCode}>
                    <Icon name={'clone'} size={16} color={BASE_COLORS.gray} />
                  </Pressable>
                </View>
                <Button
                  title={t('cancel_invite')}
                  textCenter
                  bordered
                  onPress={() => {
                    SheetManager.show('bottomSheet', renderConfirmCancelBTS);
                  }}
                  containerStyle={styles.cancelBtnContainer}
                  textStyle={styles.cancelBtn}
                />
              </View>
              <View>
                <Paragraph h5 textGray title={t('invite_note')} style={[styles.inviteNote]} />
              </View>
            </View>
          </Maybe>
          <Maybe cond={showShareQRCode}>
            <View style={[GlobalStyles.flexColumn, styles.qrCodeContainer]}>
              <Image source={IMAGES.logo} style={GlobalStyles.logo} />
              <Paragraph h5 textCenter textSteelBlueColor title={t('invited_by_message')} style={[GlobalStyles.mt5]} />
              <Paragraph h5 textCenter textSteelBlueColor title={userName()} style={[GlobalStyles.mb5]} />
              <QRCode size={200} value={code} logoBackgroundColor='transparent' />
              <Paragraph
                h5
                textCenter
                textSteelBlueColor
                title={`${t('invite_message_1')} ${userName()} ${t('trust_network')}, ${t('invite_message_2')}`}
                style={[styles.inviteMessage]}
              />
            </View>
            <Button
              title={t('share')}
              textCenter
              bordered
              onPress={handleShareQRCode}
              containerStyle={styles.shareQRBtnContainer}
              textStyle={styles.shareQRBtn}>
              <Icon name='share-nodes' color={BASE_COLORS.lavenderGray} size={adjust(12)} style={GlobalStyles.mr10} />
            </Button>
          </Maybe>
        </Maybe>
      </Maybe>
    </View>
  );
};

export default MassInvite;
