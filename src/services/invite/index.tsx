import * as API from '~Root/private/api';

import { IResponse, IResult } from '../axios/types';

import axios from '~Root/services/axios';
import { handleResponse } from '../axios/handle';

export const removeInvite = async (code: string): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'DELETE',
      url: API.REMOVE_INVITE_URL(code),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};

export const createInvite = async (body: any): Promise<IResult> => {
  if (body?.email) {
    body.email = body.email.toLowerCase();
  }
  try {
    const response: IResponse = await axios({
      method: 'POST',
      url: API.INVITE_DATA_URL,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};

export const refreshInvite = async (code: string): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'PATCH',
      url: API.REFRESH_INVITE_URL(code),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};

export const claimInvite = async (code: string): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'POST',
      url: API.CLAIM_INVITE_URL(code),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};

export const requestIncreaseInvite = async (): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'POST',
      url: API.INVITE_INCREASE_URL,
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};

export const cancelInvite = async (code: string): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'PATCH',
      url: API.CANCEL_INVITE_URL(code),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};
