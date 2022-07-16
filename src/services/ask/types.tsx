// import {IMyAsk} from '~Root/services/user/types';

import {
  CREATE_ASK_FAILURE,
  CREATE_ASK_REQUESTED,
  CREATE_ASK_SUCCESS,
  DESTROY_DATA,
  GET_ASK_BY_REF_ID_FAILURE,
  GET_ASK_BY_REF_ID_REQUESTED,
  GET_ASK_BY_REF_ID_SUCCESS,
  GET_ASK_DROPDOWN_FAILURE,
  GET_ASK_DROPDOWN_REQUESTED,
  GET_ASK_DROPDOWN_SUCCESS,
  GET_ASK_SUBMISSIONS_FAILURE,
  GET_ASK_SUBMISSIONS_REQUESTED,
  GET_ASK_SUBMISSIONS_SUCCESS,
  ON_CHANGE_PURPOSE_OF_ASK_FAILURE,
  ON_CHANGE_PURPOSE_OF_ASK_REQUESTED,
  ON_CHANGE_PURPOSE_OF_ASK_SUCCESS,
  SET_ASK_PREVIEW,
  SET_ASK_SELECTED,
  UPDATE_ASK_END_REQUESTED,
} from './constants';

import {IAskType} from '../askType/types';
import {IResponse} from '../axios/types';
import {IUser} from '../user/types';

type IInputType = 'textfield' | 'calendar' | 'textbox';

export interface IAsk {
  code: string;
  userCode: string;
  content: {
    target: string;
    detail: string;
    info: string;
  };
  typeCode: string;
  endDate: string;
  noEndDate: boolean;
  location: string;
  anywhereInWorld: boolean;
  additionalInformation: string;
  askType: IAskType;
  user: IUser | null;
  isEnd: boolean | undefined;
  endAt: string | undefined;
  foundResponder: boolean | undefined;
  secretCode: string;
  createdAt: string;
}

export interface IAskFormTemplate {
  visual: {
    type: IInputType;
  };
  required: boolean;
  autocomplete?: boolean;
  label: string;
  placeholder: string;
  key: string;
  toggle?: {
    default: boolean; // unchecked
    label: string;
    override: {
      // how to override the input field when checked
      input: boolean; // enable overriding of input field
      editable: boolean; // disable editing of input field
      save_and_restore_value: boolean; // save the original value of input field and restore if unchecked.
      value: string; // the value of the input field only if key exists
      placeholder: string; // the placeholder of the input field only if key exists.
      label: string; // the label of the input field only if key exists
      send_value: string; // send the API this value instead of the field's value. If key does not exist, send the field's value.
    };
  };
}
export interface IAskForm {
  id: string;
  ask_label_template: string;
  ask_line1_template: string;
  ask_line2_template: string;
  ask_context?: string;
  public_link_id?: string;
  based_in?: string;
  within_next?: Date;
  other_info?: string;
  form_template?: IAskFormTemplate[];
}

export interface IField {
  id: string;
  name: string;
  type: string;
  options: {
    label: string;
    checkbox?: string;
    required: boolean;
    placeholder: string;
    max_length?: number;
    name: string;
  };
  position: number;
}

export interface IFields {
  id: number;
  title: string;
  structure: IField[];
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IMyAsk {
  id: number;
  user_id: number;
  ask_template_id: number;
  data: any;
  created_at: Date;
  updated_at: Date;
  ask_template_title: string;
  deadline: Date | string;
  location: string;
  context?: string;
  line1: string;
  line2: string;
  label: string;
  reference_id?: string;
}
export interface IListAskState {
  errors: string;
  data: IFields | null;
  dataDropDown: IAskType[] | null;
  data_ask: IMyAsk[];
  data_ask_selected: IAsk | null;
  data_ask_preview: any;
  schema?: any;
  selected: IAskType | null;
  loading: boolean;
  success: boolean;
  callback: () => void;
}

export interface IAskEnd {
  endDate: string;
  noEndDate: boolean;
}

export interface IAskDropDownResponse {
  data: IFields | null;
  loading: boolean;
}
export interface IActionOnChangePurposeOfAskRequest {
  type: typeof ON_CHANGE_PURPOSE_OF_ASK_REQUESTED;
  payload: IAskType;
  callback: () => void;
}
export interface IActionOnChangePurposeOfAskSuccess {
  type: typeof ON_CHANGE_PURPOSE_OF_ASK_SUCCESS;
  payload: IFields;
  callback: () => void;
}

export interface IActionOnChangePurposeOfAskFailure {
  type: typeof ON_CHANGE_PURPOSE_OF_ASK_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionGetAskDropDownRequest {
  type: typeof GET_ASK_DROPDOWN_REQUESTED;
  callback: () => void;
}
export interface IActionGetAskDropDownSuccess {
  type: typeof GET_ASK_DROPDOWN_SUCCESS;
  payload: IAskType[];
  callback: () => void;
}

export interface IActionGetAskDropDownFailure {
  type: typeof GET_ASK_DROPDOWN_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionCreateAskRequest {
  type: typeof CREATE_ASK_REQUESTED;
  payload: any;
  callback: () => void;
}
export interface IActionCreateAskSuccess {
  type: typeof CREATE_ASK_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback: () => void;
}

export interface IActionCreateAskFailure {
  type: typeof CREATE_ASK_FAILURE;
  payload: {
    error: string;
  };
}
export interface IActionGetAskSubmissionsRequest {
  type: typeof GET_ASK_SUBMISSIONS_REQUESTED;
  payload: number | null;
  callback: () => void;
}
export interface IActionGetAskSubmissionsSuccess {
  type: typeof GET_ASK_SUBMISSIONS_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback: () => void;
}

export interface IActionGetAskSubmissionsFailure {
  type: typeof GET_ASK_SUBMISSIONS_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionGetAskByRefIdRequest {
  type: typeof GET_ASK_BY_REF_ID_REQUESTED;
  payload: string;
  callback: (response: IResponse) => void;
}
export interface IActionGetAskByRefIdSuccess {
  type: typeof GET_ASK_BY_REF_ID_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback: () => void;
}

export interface IActionGetAskByRefIdFailure {
  type: typeof GET_ASK_BY_REF_ID_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionDestroyData {
  type: typeof DESTROY_DATA;
}

export interface IActionSetAskSelected {
  type: typeof SET_ASK_SELECTED;
  payload: IAsk;
}
export interface IActionSetAskPreview {
  type: typeof SET_ASK_PREVIEW;
  payload: {
    id: number;
    data: any;
  };
}

export interface IActionUpdateAskEndInfo {
  type: typeof UPDATE_ASK_END_REQUESTED;
  code: string;
  payload: IAskEnd;
  callback: (response: IResponse) => void;
}

export type IActionsCreateAsk =
  | IActionOnChangePurposeOfAskRequest
  | IActionOnChangePurposeOfAskSuccess
  | IActionOnChangePurposeOfAskFailure
  | IActionGetAskDropDownRequest
  | IActionGetAskDropDownSuccess
  | IActionGetAskDropDownFailure
  | IActionCreateAskRequest
  | IActionCreateAskSuccess
  | IActionCreateAskFailure
  | IActionGetAskSubmissionsRequest
  | IActionGetAskSubmissionsSuccess
  | IActionGetAskSubmissionsFailure
  | IActionGetAskByRefIdRequest
  | IActionGetAskByRefIdSuccess
  | IActionGetAskByRefIdFailure
  | IActionDestroyData
  | IActionSetAskSelected
  | IActionSetAskPreview;
