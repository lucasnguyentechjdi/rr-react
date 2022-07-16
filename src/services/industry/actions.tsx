import {
  GET_INDUSTRY_REQUESTED,
  HIDE_MODAL_INDUSTRY,
  SHOW_MODAL_INDUSTRY,
  FILTER_DATA_INDUSTRY,
  SET_DATA_INDUSTRY_SELECTED,
  DELETE_DATA_INDUSTRY,
  GET_ALL_INDUSTRIES_SUCCESS,
  UPDATE_DATA_INDUSTRY,
} from './constants';
import {IModalState} from './types';

export const addIndustryRequest = (callback: any) => {
  return {
    type: GET_INDUSTRY_REQUESTED,
    callback,
  };
};

export const setIndustrySelected = (payload: any) => {
  return {
    type: SET_DATA_INDUSTRY_SELECTED,
    payload,
  };
};

export const updateDataIndustry = (payload: any) => {
  return {
    type: UPDATE_DATA_INDUSTRY,
    payload,
  };
};

export const showModal = (payload: IModalState) => {
  return {
    type: SHOW_MODAL_INDUSTRY,
    payload,
  };
};

export const hideModal = (payload: IModalState) => {
  return {
    type: HIDE_MODAL_INDUSTRY,
    payload,
  };
};

export const filterIndustry = (payload: string) => {
  return {
    type: FILTER_DATA_INDUSTRY,
    payload,
  };
};

export const getAllIndustries = (data: string[]) => {
  return {
    type: GET_ALL_INDUSTRIES_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteIndustry = (payload: number) => {
  return {
    type: DELETE_DATA_INDUSTRY,
    payload,
  };
};

export const getAllIndustryFromUser = (payload: any) => {
  return {
    type: GET_ALL_INDUSTRIES_SUCCESS,
    payload,
  };
};
