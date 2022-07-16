import {IAsk} from '../ask/types';
import {IUser} from '../user/types';

export interface IListMatches {
  id: string;
  name: string;
  image: string;
}

export interface IPeopleToAsk {
  id: string;
  name: string;
  image: string;
  title: string;
  description?: string;
  status: string;
  count: number;
  hour: string;
}

export interface INotification {
  code: string;
  role: string;
  askCode: string;
  chatCode: string;
  userCode: string;
  title: string;
  content?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}

export const CHAT_TYPE = {
  NETWORK: 'network',
  EXIST_USER: 'existUser',
  NEW_USER: 'newUser',
  GENERAL: 'general',
};

export const CHAT_STATUS = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECT: 'reject',
};

export const CHAT_MEMBER_ROLE = {
  ASKER: 'asker',
  RESPONDER: 'responder',
  INTRODUCER: 'introducer',
  USER: 'user',
};

export const CHAT_MEMBER_STATUS = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECT: 'reject',
};

export interface IChatMember {
  userCode: string;
  role: string;
  status: string;
  introducerUserCode: string;
  approvedAt: string;
  rejectedAt: string;
  newMessageCount: number | null | undefined;
  user: IUser;
}

export interface IAskContent {
  endDate: string;
  noEndDate: boolean;
  isEnd: boolean | undefined;
  location: string;
  anywhereInWorld: boolean;
  content: {
    info: string;
    detail: string;
    target: string;
  };
  typeCode?: string;
}

export interface IChat {
  code: string;
  askCode: string;
  type: string;
  status: string;
  asker: string;
  responder: string;
  introducer: string | null;
  label: STATUS_ENUM;
  members: IChatMember[];
  ask: IAskContent;
  lastMessage: string | undefined;
  createdAt: string;
  updatedAt: string | undefined;
}

export interface IMessage {
  code: string;
  userCode: string;
  chatCode: string;
  message: string;
  attachments: any[];
  createdAt: string;
  updatedAt: string | undefined;
}

export enum STATUS_ENUM {
  NEW_INTRO = 'New Intro',
  INTRO_UPDATE = 'Intro Update',
  ASK_ENDED = 'Ask Ended',
  FEEDBACK = 'Feedback',
}

export interface IChatState {
  errors: any;
  loading: boolean;
  success: boolean;
  listMatches: IListMatches[];
  peopleToAsks: IPeopleToAsk[];
  chatData: IChat[];
  chatInfo: IChat | null;
  askInfo: IAsk | null;
  chatPagination: any;
  messages: IMessage[];
  messagePagination: any;
  callback?: any;
}
