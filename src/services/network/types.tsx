import { IUser } from '../user/types';

export interface INetwork {
  parentCode: string;
  userCode: string;
  inviteCode: string | null;
  user: IUser | null;
}