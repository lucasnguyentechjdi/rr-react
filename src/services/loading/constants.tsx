import {IWaitingAsyncCall} from '~Root/types';

export const HIDE_LOADING = 'HIDE_LOADING/REQUESTED';
export const SHOW_LOADING = 'SHOW_LOADING/REQUESTED';

export const ASYNC_LOADING: IWaitingAsyncCall = {
  SHOW: SHOW_LOADING,
  HIDE: HIDE_LOADING,
};
