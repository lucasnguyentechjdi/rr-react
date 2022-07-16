import {SHOW_LOADING, HIDE_LOADING} from './constants';

// Notes state
export interface ILoadingState {
  loading: boolean;
}

// Procedures actions
export interface IActionShowLoading {
  type: typeof SHOW_LOADING;
  payload: {
    loading: boolean;
  };
}
export interface IActionHideLoading {
  type: typeof HIDE_LOADING;
  payload: {
    loading: boolean;
  };
}

export type IActionsLoading = IActionShowLoading | IActionHideLoading;
