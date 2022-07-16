import {GlobalStyles} from '~Root/config';
import {Button, InviteContactItems, InviteContactTemplateScreen, Link, Loading, Paragraph} from '~Root/components';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import {IUserState} from '~Root/services/user/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import Toast from 'react-native-toast-message';
import {clearContactSelected} from '~Root/services/contact/actions';
import {requestIncreaseInvite} from '~Root/services/invite';
import {userInfoRequest} from '~Root/services/user/actions';
import styles from './styles';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONTACT>;

const InviteRequestScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);

  const onBack = () => {
    navigation.goBack();
    dispatch(clearContactSelected());
  };

  const backToNetwork = () => {
    navigation.goBack();
  };

  const checkInviteLeft = () => {
    if (userState.invites.length >= userState.userInfo.inviteMax) {
      return 0;
    }
    return userState.userInfo.inviteMax - userState.invites.length;
  };

  const onRequestMoreInvite = async () => {
    const result = await requestIncreaseInvite();
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('send_request_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      dispatch(
        userInfoRequest(data => {
          navigation.replace(AppRoute.INVITE_CONTACT);
        }),
      );
    }
  };

  return (
    <InviteContactTemplateScreen
      title={`${t('invite_into')} ${t('trust_network')}`}
      onBack={onBack}
      isBackButton={true}>
      <View style={GlobalStyles.mb55}>
        <Paragraph
          h4
          textTealBlue
          textCenter
          bold
          title={t('invite_contact', {count: checkInviteLeft(), left: userState.userInfo.inviteMax})}
        />
        <Paragraph h4 textTealBlue textCenter title={t('each_invite')} style={styles.description} />
      </View>
      <View style={[GlobalStyles.flexColumn]}>
        <View style={[GlobalStyles.mv10]} />
        <Button
          title={t('request_for_more_invites')}
          textCenter
          bordered
          onPress={onRequestMoreInvite}
          containerStyle={styles.buttonCreateInviteContainerStyle}
          textStyle={styles.h3BoldDefault}
        />
        <Link bold style={[GlobalStyles.mv10, styles.linkMore]} title={t('request_invite')} />
      </View>
      <View style={styles.listContainer}>
        <InviteContactItems data={userState.invites} />
        <Button
          title={t('done')}
          textCenter
          bordered
          onPress={backToNetwork}
          containerStyle={styles.buttonCreateInviteContainerStyle}
          textStyle={styles.h3BoldDefault}
        />
      </View>
      <Loading />
    </InviteContactTemplateScreen>
  );
};

export default InviteRequestScreen;
