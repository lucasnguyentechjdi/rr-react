import { AppRoute } from './AppRoute';
import { IChat } from '~Root/services/chat/types';
import { IMatch } from '~Root/services/matches/types';
import { IUser } from '~Root/services/user/types';
import { NavigatorScreenParams } from '@react-navigation/native';


/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type RootNavigatorParamsList = {
  [AppRoute.SPLASH]: undefined;
  [AppRoute.APP_CHECK]: undefined;
  [AppRoute.TABS]: undefined;
  [AppRoute.LOGIN]: undefined;
  [AppRoute.PRIVACY]: {type: String};
  [AppRoute.INVITE_CODE]: undefined;
  [AppRoute.REGISTER]: { inviteCode: string };
  [AppRoute.RESET_PASSWORD]: { email: string; password: string };
  [AppRoute.CREATE_ASK]: undefined;
  [AppRoute.ON_BOARDING_SCREEN]: { item: IMatch };
  [AppRoute.HOME_SHARE_SCREEN]: undefined;
  [AppRoute.HOME]: undefined;
  [AppRoute.HOME_DETAIL]: undefined;
  [AppRoute.ASK_SHARE]: undefined;
  [AppRoute.VERIFY_EMAIL]: undefined;
  [AppRoute.VERIFIED_EMAIL]: undefined;
  [AppRoute.FORGOT_PASSWORD]: undefined;
  [AppRoute.RECOVER_PASSWORD]: { email: string };
  [AppRoute.PROFILE]: undefined;
  [AppRoute.GUEST_PROFILE]: { userInfo: IUser };
  [AppRoute.PROFILE_SECOND]: { indexAsk?: number };
  [AppRoute.PROFILE_PERSONAL]: undefined;
  [AppRoute.PROFILE_INDUSTRY]: undefined;
  [AppRoute.INVITE_CONTACT]: undefined;
  [AppRoute.INVITE_CONTACT_EDIT]: undefined;
  [AppRoute.LIST_CONTACT]: undefined;
  [AppRoute.FEED_BACK_MODAL]: undefined;
  [AppRoute.INDIVIDUAL_MESSAGE_MODAL]: undefined;
  [AppRoute.JOINT_MESSAGE_MODAL]: undefined;
  [AppRoute.INVITE_REQUEST]: undefined;
  [AppRoute.CHAT]: undefined;
  [AppRoute.CHAT_INTERNAL]: undefined | { chatInfo: IChat };
  [AppRoute.CHAT_GENERAL_INTERNAL]: undefined | { chatInfo: IChat };
  [AppRoute.CHAT_CONTEXT_SWITCH]: undefined | { code: string | undefined };
  [AppRoute.CHAT_NOTIFICATION_ASKER]: undefined;
  [AppRoute.CHAT_NOTIFICATION_ASKER_REJECT_APPROVED]: undefined;
  [AppRoute.CHAT_NOTIFICATION_INTRODUCER]: undefined;
  [AppRoute.CHAT_NOTIFICATION_RESPONDER]: undefined;
  [AppRoute.VIEW_PARTICIPANT]: undefined;
  [AppRoute.CLAIM_CODE]: undefined;
  [AppRoute.ASK_UPDATE]: undefined;
  [AppRoute.RESET_PASSWORD_SUCCESS]: undefined;
  [AppRoute.RESENT_PASSWORD]: { email: string };
};

// type AIRFeedStackScreenParams = {
//   AIRFeed: undefined;
// };

export type AIRFeed1 = {
  Root: { screen: string };
};

export type AIRFeedParamsList = {
  [AppRoute.AIR_FEED]: undefined;
};

export type TabNavigatorParamsList = {
  [AppRoute.HOME]: undefined;
  [AppRoute.CHAT]: undefined;
  [AppRoute.AIR_FEED]: NavigatorScreenParams<AIRFeedParamsList>;
};

export type MainNavigatorParamsList = {
  [AppRoute.YOUR_ASKS]: undefined;
  [AppRoute.TRUST]: undefined;
  [AppRoute.PROFILE_PERSONAL]: undefined;
  [AppRoute.AIR_FEED]: undefined;
  [AppRoute.INVITE_CONTACT]: undefined;
  [AppRoute.INVITE_CONTACT_EDIT]: undefined;
  [AppRoute.HOME_DETAIL]: { reference_id?: undefined | string };
  [AppRoute.ASK_SHARE]: { reference_id?: undefined | string };
  [AppRoute.CREATE_ASK]: undefined;
  [AppRoute.ASK_PREVIEW]: undefined;
  [AppRoute.ASK_PUBLISH]: undefined;
  [AppRoute.ON_BOARDING_SCREEN]: { item: IMatch };
  [AppRoute.HOME_SHARE_SCREEN]: undefined;
  [AppRoute.CHAT]: undefined;
  [AppRoute.LOGIN]: undefined;
  [AppRoute.PRIVACY]: { type?: undefined | string };
  [AppRoute.INVITE_CODE]: { invite_code?: string };
  [AppRoute.INVITE_REQUEST]: undefined;
  [AppRoute.VERIFY_EMAIL]: undefined;
  [AppRoute.VERIFIED_EMAIL]: undefined;
  [AppRoute.FORGOT_PASSWORD]: undefined;
  [AppRoute.RECOVER_PASSWORD]: { email: string };
  [AppRoute.PROFILE]: undefined;
  [AppRoute.PROFILE_SECOND]: { indexAsk?: number };
  [AppRoute.GUEST_PROFILE]: { userInfo: IUser };
  [AppRoute.CREATE_ASK]: undefined;
  [AppRoute.FEED_BACK_MODAL]: undefined;
  [AppRoute.INDIVIDUAL_MESSAGE_MODAL]: undefined;
  [AppRoute.JOINT_MESSAGE_MODAL]: undefined;
  [AppRoute.CHAT_INTERNAL]: undefined | { chatInfo: IChat };
  [AppRoute.CHAT_GENERAL_INTERNAL]: undefined | { chatInfo: IChat };
  [AppRoute.CHAT_NOTIFICATION_RESPONDER]: undefined;
  [AppRoute.CHAT_NOTIFICATION_ASKER]: undefined;
  [AppRoute.CHAT_NOTIFICATION_ASKER_REJECT_APPROVED]: undefined;
  [AppRoute.CHAT_NOTIFICATION_INTRODUCER]: undefined;
  [AppRoute.ASK_UPDATE]: undefined;
};

// interface AuthNavigatorParamsList {
//   [AppRoute.Login]: undefined
//   [AppRoute.Signup]: undefined
//   [AppRoute.ForgotPassword]: { email?: string }
// }

// export type RootNavigatorParamsList = MainNavigatorParamsList | Record<string, undefined>;
