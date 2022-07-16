import {SHOW_LOADING, HIDE_LOADING} from './constants';
import {ILoadingState, IActionsLoading} from './types';

const initialState: ILoadingState = {
  loading: false,
};

const loadingReducer = (state: ILoadingState = initialState, action: IActionsLoading): ILoadingState => {
  switch (action.type) {
    case SHOW_LOADING:
      return {...state, loading: true};
    case HIDE_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};

export default loadingReducer;
