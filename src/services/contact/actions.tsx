import {
  SET_CONTACT,
  SET_CONTACT_SELECTED,
  SHOW_MODAL_CONTACT,
  HIDE_MODAL_CONTACT,
  CLEAR_CONTACT_SELECTED,
} from './constants';
import {IActionSetContact, RowItem} from './types';

export const setContact = (payload: IActionSetContact['payload'], callback: () => void) => {
  return {
    type: SET_CONTACT,
    payload,
    callback,
  };
};

export const setContactSelected = (payload: RowItem | null, callback: () => void) => {
  return {
    type: SET_CONTACT_SELECTED,
    payload,
    callback,
  };
};

export const clearContactSelected = () => {
  return {
    type: CLEAR_CONTACT_SELECTED,
    payload: null,
  };
};

export const showModalContact = () => {
  return {
    type: SHOW_MODAL_CONTACT,
  };
};

export const hideModalContact = () => {
  return {
    type: HIDE_MODAL_CONTACT,
  };
};
