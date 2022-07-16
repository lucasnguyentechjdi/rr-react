import * as AuthActions from '~Root/services/auth/actions';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainNavigatorParamsList, RootNavigatorParamsList } from './config';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { BASE_SETTINGS } from '~Root/config';
import { AppState } from '~Root/reducers';
import AIRFeedScreen from '~Root/screens/AIRFeed';
import AppCheckScreen from '~Root/screens/AppCheck';
import AskPreviewScreen from '~Root/screens/AskPreview';
import AskPublishScreen from '~Root/screens/AskPublish';
import AskShareScreen from '~Root/screens/AskShare';
import AskUpdateScreen from '~Root/screens/AskUpdate';
import ChatScreen from '~Root/screens/Chat';
import ChatContextSwitch from '~Root/screens/ChatContextSwitch/index';
import ChatInternalScreen from '~Root/screens/ChatInternal';
import ChatGeneralInternalScreen from '~Root/screens/ChatInternal/general';
import ChatNotificationAsker from '~Root/screens/ChatNotifyAsker';
import ChatNotifyIntroducer from '~Root/screens/ChatNotifyIntroducer';
import ChatNotifyRejectApproved from '~Root/screens/ChatNotifyRejectApproved';
import ChatNotificationResponder from '~Root/screens/ChatNotifyResponder';
import CreateAskScreen from '~Root/screens/CreateAsk';
import FeedBackModalScreen from '~Root/screens/FeedBackModal';
import ForgotPasswordScreen from '~Root/screens/ForgotPassword';
import HomeDetailScreen from '~Root/screens/HomeDetail';
import IndividualJointModalScreen from '~Root/screens/IndividualJointModal';
import IndividualMessageModalScreen from '~Root/screens/IndividualMessageModal';
import InviteCodeScreen from '~Root/screens/InviteCode';
import InviteContactScreen from '~Root/screens/InviteContact';
import InviteRequestScreen from '~Root/screens/InviteContact/request';
import InviteContactEditScreen from '~Root/screens/InviteContactEdit';
import ListContactScreen from '~Root/screens/ListContact';
import LoginScreen from '~Root/screens/Login';
import ProfileScreen from '~Root/screens/Profile';
import GuestProfileScreen from '~Root/screens/Profile/guestProfile';
import ProfileIndustryScreen from '~Root/screens/ProfileIndustry';
import ProfilePersonalScreen from '~Root/screens/ProfilePersonal';
import ProfileSecondScreen from '~Root/screens/ProfileSecond';
import RecoverPasswordScreen from '~Root/screens/RecoverPassword';
import RegisterScreen from '~Root/screens/Register';
import ResentPasswordScreen from '~Root/screens/ResentPassword';
import ResetPasswordScreen from '~Root/screens/ResetPassword';
import ResetPasswordSuccessScreen from '~Root/screens/ResetPasswordSuccess';
import SplashScreen from '~Root/screens/Splash';
import TrustScreen from '~Root/screens/Trust';
import VerifiedEmailScreen from '~Root/screens/VerifiedEmail';
import VerifyEmailScreen from '~Root/screens/VerifyEmail';
import ViewParticipant from '~Root/screens/ViewParticipant';
import YourAsksScreen from '~Root/screens/YourAsks';
import PrivacyScreen from '~Root/screens/Privacy'
import { AppRoute } from './AppRoute';
import styles from './styles';
import TabBar from './TabBar';
import { useTranslation } from 'react-i18next';


enableScreens();

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const MainStack = createNativeStackNavigator<MainNavigatorParamsList>();
const AIRFeedStack = createNativeStackNavigator<MainNavigatorParamsList>();
const Tab = createBottomTabNavigator();

const MainNavigator = (props: any) => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.YOUR_ASKS}
      {...props}>
      <MainStack.Screen name={AppRoute.YOUR_ASKS} component={YourAsksScreen} />
    </MainStack.Navigator>
  );
};

const AIRFeedNavigator = (props: any) => {
  // const {navigation, route} = props;
  // const tabHiddenRoutes = [AppRouteNotTabBar.PROFILE_SECOND];

  // useEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  //   console.log('routeName==========>', routeName);
  //   console.log('tabHiddenRoutes========>', tabHiddenRoutes);
  //   console.log('tabHiddenRoutes.includes(routeName)========>', tabHiddenRoutes.includes(routeName));
  //   if (tabHiddenRoutes.includes(routeName)) {
  //     navigation.setOptions({tabBarVisible: false});
  //   } else {
  //     navigation.setOptions({tabBarVisible: true});
  //   }
  // }, [navigation, route]);

  return (
    <AIRFeedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.AIR_FEED}
      {...props}>
      <AIRFeedStack.Screen name={AppRoute.AIR_FEED} component={AIRFeedScreen} />
    </AIRFeedStack.Navigator>
  );
};

const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.tabBarArea}>
      <Tab.Navigator
        initialRouteName={AppRoute.YOUR_ASKS}
        screenOptions={({ route }) => ({ headerShown: false })}
        tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name={AppRoute.YOUR_ASKS}
          component={YourAsksScreen} />
        <Tab.Screen name={AppRoute.AIR_FEED} component={AIRFeedNavigator} />
        <Tab.Screen name={AppRoute.TRUST} component={TrustScreen} />
        <Tab.Screen name={AppRoute.CHAT} component={ChatScreen} />
      </Tab.Navigator>
    </View>
  );
};

const AppNavigator = (props: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.authState);

  useEffect(() => {
    const initLanguage = async () => {
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources: BASE_SETTINGS.resourcesLanguage,
        lng: BASE_SETTINGS.defaultLanguage,
        fallbackLng: BASE_SETTINGS.defaultLanguage,
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initLanguage();

    setTimeout(() => {
      dispatch(AuthActions.initAuth());
    }, 1000);
  }, [dispatch]);

  if (!authState.isAppReady) {
    return <></>;
  }
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.SPLASH}
      {...props}>
      {!authState.isAppReady ? (
        <RootStack.Screen name={AppRoute.SPLASH} component={SplashScreen} />
      ) : authState.isLoggedIn ? (
        <>
          <RootStack.Screen name={AppRoute.SPLASH} component={AppCheckScreen} />
          <RootStack.Screen name={AppRoute.TABS} component={TabNavigator} />
          <RootStack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
          <RootStack.Screen name={AppRoute.PRIVACY} component={PrivacyScreen} />
          <RootStack.Screen name={AppRoute.GUEST_PROFILE} component={GuestProfileScreen} />
          <RootStack.Screen name={AppRoute.PROFILE_PERSONAL} component={ProfilePersonalScreen} />
          <RootStack.Screen name={AppRoute.PROFILE_INDUSTRY} component={ProfileIndustryScreen} />
          <RootStack.Screen name={AppRoute.PROFILE_SECOND} component={ProfileSecondScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONTACT} component={InviteContactScreen} />
          <RootStack.Screen name={AppRoute.INVITE_REQUEST} component={InviteRequestScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONTACT_EDIT} component={InviteContactEditScreen} />
          <RootStack.Screen name={AppRoute.CHAT} component={ChatScreen} />
          <RootStack.Screen name={AppRoute.CHAT_INTERNAL} component={ChatInternalScreen} />
          <RootStack.Screen name={AppRoute.CHAT_GENERAL_INTERNAL} component={ChatGeneralInternalScreen} />
          <RootStack.Screen name={AppRoute.CHAT_CONTEXT_SWITCH} component={ChatContextSwitch} />
          <RootStack.Screen name={AppRoute.CHAT_NOTIFICATION_ASKER} component={ChatNotificationAsker} />
          <RootStack.Screen name={AppRoute.CHAT_NOTIFICATION_INTRODUCER} component={ChatNotifyIntroducer} />
          <RootStack.Screen name={AppRoute.CHAT_NOTIFICATION_RESPONDER} component={ChatNotificationResponder} />
          <RootStack.Screen name={AppRoute.HOME_DETAIL} component={HomeDetailScreen} />
          <RootStack.Screen name={AppRoute.ASK_SHARE} component={AskShareScreen} />
          <RootStack.Screen name={AppRoute.CLAIM_CODE}>
            {props => <InviteCodeScreen {...props} claimCode={true} />}
          </RootStack.Screen>
          <RootStack.Screen
            name={AppRoute.CHAT_NOTIFICATION_ASKER_REJECT_APPROVED}
            component={ChatNotifyRejectApproved}
          />
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <MainStack.Screen name={AppRoute.CREATE_ASK} component={CreateAskScreen} />
            <MainStack.Screen name={AppRoute.ASK_PREVIEW} component={AskPreviewScreen} />
            <MainStack.Screen name={AppRoute.ASK_PUBLISH} component={AskPublishScreen} />
            <RootStack.Screen name={AppRoute.ASK_UPDATE} component={AskUpdateScreen} />
            <RootStack.Screen name={AppRoute.INDIVIDUAL_MESSAGE_MODAL} component={IndividualMessageModalScreen} />
            <RootStack.Screen name={AppRoute.JOINT_MESSAGE_MODAL} component={IndividualJointModalScreen} />
            <RootStack.Screen name={AppRoute.LIST_CONTACT} component={ListContactScreen} />
            <RootStack.Screen name={AppRoute.FEED_BACK_MODAL} component={FeedBackModalScreen} />
            <RootStack.Screen name={AppRoute.VIEW_PARTICIPANT} component={ViewParticipant} />
          </RootStack.Group>
        </>
      ) : (
        <>
          <RootStack.Screen name={AppRoute.LOGIN} component={LoginScreen} />
          <RootStack.Screen name={AppRoute.PRIVACY} component={PrivacyScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CODE} component={InviteCodeScreen} />
          <RootStack.Screen name={AppRoute.REGISTER} component={RegisterScreen} />
          <RootStack.Screen name={AppRoute.RESET_PASSWORD} component={ResetPasswordScreen} />
          <RootStack.Screen name={AppRoute.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
          <RootStack.Screen name={AppRoute.VERIFY_EMAIL} component={VerifyEmailScreen} />
          <RootStack.Screen name={AppRoute.VERIFIED_EMAIL} component={VerifiedEmailScreen} />
          <RootStack.Screen name={AppRoute.RECOVER_PASSWORD} component={RecoverPasswordScreen} />
          <RootStack.Screen name={AppRoute.RESET_PASSWORD_SUCCESS} component={ResetPasswordSuccessScreen} />
          <RootStack.Screen name={AppRoute.RESENT_PASSWORD} component={ResentPasswordScreen} />
          {/* <RootStack.Screen name={AppRoute.HOME_DETAIL} component={HomeDetailScreen} /> */}
          {/* <RootStack.Screen name={AppRoute.ASK_SHARE} component={AskShareScreen} /> */}
          <RootStack.Screen name={AppRoute.GUEST_PROFILE} component={GuestProfileScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
