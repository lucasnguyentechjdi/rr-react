import {IUser} from '../user/types';
import {CountryCode} from 'react-native-country-picker-modal';

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
}

export const INVITE_STATUS = {
  NEW: 'new',
  APPROVED: 'approved',
  REVOKED: 'revoked',
};

export interface IInviteFormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}
