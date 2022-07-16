import {mergeUnique} from '~Root/utils/common';
import {
  ON_CHANGE_PURPOSE_OF_ASK_REQUESTED,
  ON_CHANGE_PURPOSE_OF_ASK_SUCCESS,
  ON_CHANGE_PURPOSE_OF_ASK_FAILURE,
  GET_ASK_DROPDOWN_REQUESTED,
  GET_ASK_DROPDOWN_SUCCESS,
  GET_ASK_DROPDOWN_FAILURE,
  CREATE_ASK_REQUESTED,
  CREATE_ASK_SUCCESS,
  CREATE_ASK_FAILURE,
  GET_ASK_SUBMISSIONS_REQUESTED,
  GET_ASK_SUBMISSIONS_SUCCESS,
  GET_ASK_SUBMISSIONS_FAILURE,
  DESTROY_DATA,
  SET_ASK_SELECTED,
  GET_ASK_BY_REF_ID_REQUESTED,
  GET_ASK_BY_REF_ID_SUCCESS,
  GET_ASK_BY_REF_ID_FAILURE,
  SET_ASK_PREVIEW,
} from './constants';
import {IActionsCreateAsk, IListAskState} from './types';

export const initialState: IListAskState = {
  errors: '',
  loading: false,
  success: false,
  data: null,
  dataDropDown: null,
  data_ask_preview: null,
  data_ask: [],
  data_ask_selected: null,
  selected: null,
  schema: {},
  callback: () => {},
};

const askReducer = (state: IListAskState = initialState, action: IActionsCreateAsk): IListAskState => {
  switch (action.type) {
    case GET_ASK_DROPDOWN_REQUESTED:
    case CREATE_ASK_REQUESTED:
    case GET_ASK_SUBMISSIONS_REQUESTED:
    case GET_ASK_BY_REF_ID_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case ON_CHANGE_PURPOSE_OF_ASK_REQUESTED:
      return {...state, callback: action?.callback, selected: action.payload, loading: true};
    case ON_CHANGE_PURPOSE_OF_ASK_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case GET_ASK_DROPDOWN_SUCCESS:
      return {...state, loading: false, dataDropDown: [...action.payload]};
    case GET_ASK_SUBMISSIONS_SUCCESS:
      return {...state, loading: false, data_ask: action.payload?.data};
    case CREATE_ASK_SUCCESS:
      return {...state, loading: false, data_ask: mergeUnique(state.data_ask, [action?.payload?.data])};
    case DESTROY_DATA:
      return {
        ...state,
        dataDropDown: null,
        data: null,
        data_ask_preview: null,
        data_ask: [],
        data_ask_selected: null,
        selected: null,
      };
    case SET_ASK_SELECTED:
      return {...state, data_ask_selected: action?.payload};
    case SET_ASK_PREVIEW:
      return {...state, data_ask_preview: action?.payload};
    case GET_ASK_BY_REF_ID_SUCCESS:
      return {...state, data_ask_selected: action?.payload?.data};
    case ON_CHANGE_PURPOSE_OF_ASK_FAILURE:
    case GET_ASK_DROPDOWN_FAILURE:
    case CREATE_ASK_FAILURE:
    case GET_ASK_SUBMISSIONS_FAILURE:
    case GET_ASK_BY_REF_ID_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    default:
      return state;
  }
};

export default askReducer;
