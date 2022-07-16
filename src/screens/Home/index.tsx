import { GlobalStyles, IMAGES } from '~Root/config';
import { HomeTemplateScreen, Loading } from '~Root/components';
import React, { useEffect, useState } from 'react';
import { getAskDropDown, setAskSelected } from '~Root/services/ask/actions';
import { getUserAskData, getUserInviteData, getUserNetworkData } from '~Root/services/user/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import Ask from './Ask';
import { IAsk } from '~Root/services/ask/types';
import { IAuthState } from '~Root/services/auth/types';
import { IGlobalState } from '~Root/types';
import { IUserState } from '~Root/services/user/types';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';
import Toast from 'react-native-toast-message';
import TrustNetwork from './TrustNetwork';
import messaging from '@react-native-firebase/messaging';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.HOME>;

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipTrustNetwork, setShowTooltipTrustNetwork] = useState(false);
  const { t } = useTranslation();
  let isScroll = false;

  const subscribeTopic = () => {
    if (!userState.userInfo) return;
    void messaging()
      .subscribeToTopic(userState.userInfo.code)
      .then(() => console.log('Subscribed to topic!', userState.userInfo.code));
  };

  useEffect(() => {
    if (authState?.isLoggedIn && userState?.userInfo?.profileCompleted) {
      dispatch(getUserInviteData());
      dispatch(getUserNetworkData());
      const page = userState?.askPagination?.pageCurrent ?? 1;
      const limit = userState?.askPagination?.recordPerPage ?? 50;
      dispatch(getUserAskData(page, limit));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigation, authState.isLoggedIn]);

  useEffect(() => {
    subscribeTopic();
    dispatch(getAskDropDown());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.userInfo]);

  const onBack = () => {
    navigation.goBack();
  };

  const onProfile = () => {
    navigation.navigate(AppRoute.PROFILE);
  };

  const onEdit = () => {
    navigation.navigate(AppRoute.PROFILE);
  };

  const onAsk = () => {
    dispatch(setAskSelected(null));
    navigation.navigate(AppRoute.CREATE_ASK);
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

  const onAskItemClick = (item: IAsk) => {
    if (isScroll) return;
    dispatch(setAskSelected(item));
    navigation.navigate(AppRoute.HOME_DETAIL);
  };

  const onTooltipPress = () => {
    setShowTooltip((prevState: boolean) => !prevState);
  };

  const onTooltipTrustNetWorkPress = () => {
    console.log('run');
    setShowTooltipTrustNetwork((prevState: boolean) => !prevState);
  };

  const checkInviteLeft = () => {
    if (userState.invites.length >= userState.userInfo.inviteMax) {
      return 0;
    }
    return userState.userInfo.inviteMax - userState.invites.length;
  };

  const onChangeTab = () => {
    isScroll = false;
  };

  const onScroll = (event: any) => {
    isScroll = true;
    if (event === 0 || event === 1) {
      isScroll = false;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <HomeTemplateScreen
      onBack={onBack}
      onProfile={onProfile}
      onEdit={onEdit}
      containerHeaderStyle={GlobalStyles.containerHeaderStyle}
      profile={userState?.userInfo}
      showLogout={true}
      isBackButton={false}>
      <ScrollableTabView initialPage={0} onScroll={onScroll} onChangeTab={onChangeTab} renderTabBar={() => <TabBar />}>
        <Ask
          tabLabel={IMAGES.iconSound}
          contentProps={{
            askState: userState.asks,
            onPress: onAsk,
            showTooltip,
            onTooltipPress: onTooltipPress,
            onItemClick: onAskItemClick,
          }}
        />
        <TrustNetwork
          tabLabel={IMAGES.iconShield}
          contentProps={{
            invitesLeft: checkInviteLeft(),
            invokeInvite: userState?.invokeInvite,
            onPress: onInvite,
            showTooltip: showTooltipTrustNetwork,
            onTooltipPress: onTooltipTrustNetWorkPress,
            navigation: navigation,
          }}
        />
      </ScrollableTabView>
    </HomeTemplateScreen>
  );
};

export default HomeScreen;
