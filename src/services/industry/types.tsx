import {
  GET_INDUSTRY_REQUESTED,
  GET_INDUSTRY_SUCCESS,
  GET_INDUSTRY_FAILURE,
  SHOW_MODAL_INDUSTRY,
  HIDE_MODAL_INDUSTRY,
  FILTER_DATA_INDUSTRY,
  GET_ALL_INDUSTRIES_REQUESTED,
  GET_ALL_INDUSTRIES_SUCCESS,
  GET_ALL_INDUSTRIES_FAILURE,
  SET_DATA_INDUSTRY_SELECTED,
  DELETE_DATA_INDUSTRY,
  UPDATE_DATA_INDUSTRY,
} from './constants';

export interface IIndustry {
  id: string;
  name: string;
}

export interface IIndustryState {
  errors: string[];
  loading: boolean;
  industryOriginal: string[];
  industrySelected: string[];
  industries: string[];
  yourIndustries: string[];
  sellToIndustries: string[];
  partnerIndustries: string[];
  callback?: () => void;
  showModal: boolean;
  title?: string;
  target?: number | string | null;
  textSearch?: string;
}

export interface IModalState {
  title: string;
  target?: number | string | null;
}

export interface IActionFilterIndustry {
  type: typeof FILTER_DATA_INDUSTRY;
  payload: string;
}

export interface IActionIndustryRequested {
  type: typeof GET_INDUSTRY_REQUESTED;
  callback?: any;
}
export interface IActionIndustrySuccess {
  type: typeof GET_INDUSTRY_SUCCESS;
  payload: {
    data: string[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionIndustryFailure {
  type: typeof GET_INDUSTRY_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionAllIndustriesRequested {
  type: typeof GET_ALL_INDUSTRIES_REQUESTED;
  callback?: any;
}
export interface IActionAllIndustriesSuccess {
  type: typeof GET_ALL_INDUSTRIES_SUCCESS;
  payload: {
    data: string[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionAllIndustriesFailure {
  type: typeof GET_ALL_INDUSTRIES_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionSetDataIndustrySelected {
  type: typeof SET_DATA_INDUSTRY_SELECTED;
  payload: string[];
}

export interface IActionDeleteIndustry {
  type: typeof DELETE_DATA_INDUSTRY;
  payload: number;
}
export interface IActionShowModalIndustry {
  type: typeof SHOW_MODAL_INDUSTRY;
  payload: {
    title: string;
    showModal: boolean;
  };
}

export interface IActionHideModalIndustry {
  type: typeof HIDE_MODAL_INDUSTRY;
  payload: {
    title: string;
    showModal: boolean;
  };
}

export interface IActionUpdateIndustry {
  type: typeof UPDATE_DATA_INDUSTRY;
  payload: any;
}

export type IActionsUser =
  | IActionIndustryRequested
  | IActionIndustrySuccess
  | IActionIndustryFailure
  | IActionShowModalIndustry
  | IActionHideModalIndustry
  | IActionFilterIndustry
  | IActionAllIndustriesRequested
  | IActionAllIndustriesSuccess
  | IActionAllIndustriesFailure
  | IActionSetDataIndustrySelected
  | IActionDeleteIndustry
  | IActionUpdateIndustry;
