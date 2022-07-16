import {
  DELETE_DATA_INDUSTRY,
  FILTER_DATA_INDUSTRY,
  GET_ALL_INDUSTRIES_FAILURE,
  GET_ALL_INDUSTRIES_REQUESTED,
  GET_ALL_INDUSTRIES_SUCCESS,
  GET_INDUSTRY_FAILURE,
  GET_INDUSTRY_REQUESTED,
  GET_INDUSTRY_SUCCESS,
  HIDE_MODAL_INDUSTRY,
  SET_DATA_INDUSTRY_SELECTED,
  SHOW_MODAL_INDUSTRY,
  UPDATE_DATA_INDUSTRY,
} from './constants';
import { IActionsUser, IIndustryState } from './types';

export const initialState: IIndustryState = {
  errors: [],
  loading: false,
  industryOriginal: [],
  industrySelected: [],
  industries: [],
  yourIndustries: [],
  sellToIndustries: [],
  partnerIndustries: [],
  showModal: false,
  callback: () => { },
  title: '',
  target: null,
  textSearch: '',
};

const userReducer = (state: IIndustryState = initialState, action: IActionsUser): IIndustryState => {
  switch (action.type) {
    case GET_INDUSTRY_REQUESTED:
    case GET_ALL_INDUSTRIES_REQUESTED:
      return { ...state, callback: action?.callback, loading: true };
    case GET_INDUSTRY_SUCCESS:
    case GET_ALL_INDUSTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        industryOriginal: action?.payload?.data || [],
        industries: action?.payload?.data
          ? initialState.industries.concat(action?.payload?.data)
          : initialState.industries,
        sellToIndustries: action?.payload?.data || [],
        partnerIndustries: action?.payload?.data || [],
        errors: [action?.payload?.message],
      };
    case GET_INDUSTRY_FAILURE:
    case GET_ALL_INDUSTRIES_FAILURE:
      return { ...state, loading: false, errors: [action.payload.error] };
    case SET_DATA_INDUSTRY_SELECTED:
      return { ...state, industrySelected: action?.payload };
    case SHOW_MODAL_INDUSTRY:
      return { ...state, ...action.payload, showModal: true };
    case HIDE_MODAL_INDUSTRY:
      return { ...state, ...action.payload, title: '', showModal: false };
    case FILTER_DATA_INDUSTRY: {
      const dataIndustry = filterIndustry(state, action.payload);
      return { ...state, textSearch: action?.payload, industries: dataIndustry };
    }
    case UPDATE_DATA_INDUSTRY: {
      return { ...state, industries: action.payload };
    }
    case DELETE_DATA_INDUSTRY: {
      const dataFilter = deleteIndustry(state?.yourIndustries, action?.payload);
      return { ...state, yourIndustries: dataFilter };
    }
    default:
      return state;
  }
};

const filterIndustry = (state: IIndustryState, textSearch: string) => {
  const arr: string[] = [];
  if (!textSearch) return state.industryOriginal;
  state.industries.forEach(x => {
    if (x.toLowerCase().includes(textSearch?.toLowerCase())) {
      arr.push(x);
    }
  });
  return arr;
};

const deleteIndustry = (industries: string[], index: number) => {
  if (industries.length > 0) {
    return (industries as any).filter((_: any, i: number) => index !== i);
  }
  return industries;
};

export default userReducer;
