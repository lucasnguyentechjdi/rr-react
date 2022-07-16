import {IAuthState} from '~Root/services/auth/types';
import {IChatState} from '~Root/services/chat/types';
import {IContactState} from '~Root/services/contact/types';
import {IFeedState} from '~Root/services/feed/types';
import {IIndustryState} from '~Root/services/industry/types';
import {IListAskState} from '~Root/services/ask/types';
import {ILoadingState} from '~Root/services/loading/types';
import {ILoginState} from '~Root/services/login/types';
import {IMatchesState} from '~Root/services/matches/types';
import {IRegisterState} from '~Root/services/register/types';
import {IUser, IUserState} from '~Root/services/user/types';

// Global state
export interface IGlobalState {
  loadingState: ILoadingState;
  loginState: ILoginState;
  authState: IAuthState;
  userState: IUserState;
  askState: IListAskState;
  chatState: IChatState;
  matchesState: IMatchesState;
  industryState: IIndustryState;
  contactState: IContactState;
  feedState: IFeedState;
  registerState: IRegisterState;
}

// Interface for async call steps
export interface IAsyncCall {
  REQUESTED: string;
  SUCCESS: string;
  FAILURE: string;
}

export interface ISetAsyncCall {
  SET: string;
}

export interface IOnAsyncCall {
  ON: string;
}
export interface IModalAsyncCall {
  SHOW: string;
  HIDE: string;
}

export interface IWaitingAsyncCall {
  SHOW: string;
  HIDE: string;
}

export interface IPaginationRequest {
  page?: number;
  limit?: number;
}

export interface IPaginationResponse {
  recordTotal?: number;
  pageCurrent?: number;
  recordPerPage?: number;
}

export interface INotificationContent {
  text: string;
  date: number;
  dateText: string;
  timeText: string;
  user: IUser | undefined;
}
