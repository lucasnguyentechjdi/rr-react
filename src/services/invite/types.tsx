import { IUser } from '../user/types';
import { CountryCode } from 'react-native-country-picker-modal';

export enum INVITE_STATUS {
  NEW = 'new',
  APPROVED = 'approved',
  REVOKED = 'revoked',
};

export interface IInvite {
  code: string;
  type: string;
  userCode: string;
  askCode: string | null;
  name: string | null;
  email: string | undefined;
  phoneNumber: string | undefined;
  countryCode: CountryCode | undefined;
  secretCode: string;
  status: string;
  user: IUser | null;
  createdAt: string | undefined;
  usesLeft?: number;
}

export interface IInviteFormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

export interface ICreateInvitePayload {
  maxUse?: number;
}

export enum ENetworkInvite {
  Individual = 'individual',
  MassInvite = 'massInvite',
}

export type TInviteState = {
  isRequesting: boolean;
  massInviteCode?: IInvite;
};
