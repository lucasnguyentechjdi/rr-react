import {IAsk} from '~Root/services/ask/types';
import {IRandomDataFeed} from '~Root/services/feed/types';
import AskAPI from '~Root/services/ask/apis';
import UserAPI from '~Root/services/user/apis';

export const buildShareInviteLink = async (secretCode: string) => {
  if (!secretCode) return false;
  const inviteInfo = await UserAPI.getInviteLink(secretCode);
  if (inviteInfo?.data?.inviteLink) {
    return inviteInfo.data.inviteLink;
  }
  return false;
};

export const buildShareLink = async (ask: IAsk | Partial<IRandomDataFeed>) => {
  if (!ask?.code) return false;
  const shareAskInfo = await AskAPI.shareAsk(ask.code);
  if (shareAskInfo?.data?.inviteLink) {
    return shareAskInfo.data.inviteLink;
  }
  return false;
  // return `https://referreach-webflow.vercel.app/?code=${ask?.secretCode ?? ''}`;
  // const link = await dynamicLinks().buildLink({
  //   link: `https://referreach.page.link/a/${ask?.code ?? ''}`,
  //   // domainUriPrefix is created in your Firebase console
  //   domainUriPrefix: 'https://referreach.page.link',
  //   // optional setup which updates Firebase analytics campaign
  //   // "banner". This also needs setting up before hand
  //   android: {
  //     packageName: 'com.referreach.mobile',
  //     fallbackUrl: `https://referreach-webflow.vercel.app/?code=${ask?.secretCode ?? ''}`,
  //   },
  //   // ios: {
  //   //   bundleId: 'com.referreach.mobile',
  //   // },
  // });
  // return link;
};
