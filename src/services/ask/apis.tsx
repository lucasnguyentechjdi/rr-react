/* eslint-disable @typescript-eslint/no-extraneous-class */

import * as API from '~Root/private/api';

import {IAskEnd} from './types';
import axios from '~Root/services/axios';
import {handleResponse} from '../axios/handle';
import i18n from 'i18next';

export default class AskAPI {
  static async getDataDropDown() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.ASK_TEMPLATE_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async getAskForm(id: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.ASK_TEMPLATE_URL}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status !== 200) {
        throw new Error(i18n.t('not_match'));
      }
      return {
        data: response.data,
        message: '',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async createAsk(payload: any) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.CREATE_SINGLE_ASK_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async getAskSubmissions(id: number | null) {
    try {
      let url: string = API.ASK_TEMPLATE_SUBMISSIONS_URL;
      if (id) {
        url += `?ask_template_id=${id}`;
      }
      const response = await axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status !== 200) {
        throw new Error(i18n.t('not_match'));
      }
      return {
        data: response.data,
        message: '',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getAskByRefId(id: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_SINGLE_ASK_URL(id),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async getAskBySecretCode(id: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_INFO_ASK_BY_SECRET_URL(id),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async updateAsk(code: string, body: any) {
    try {
      const response = await axios({
        method: 'PATCH',
        url: API.UPDATE_ASK_INFO(code),
        data: body.data,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async updateAskEndInfo(code: string, body: IAskEnd) {
    try {
      const response = await axios({
        method: 'PATCH',
        url: API.UPDATE_ASK_END_INFO(code),
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async shareAsk(code: string) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.SHARE_ASK(code),
        data: {},
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async getMemberAsk(code: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_MEMBER_ASK(code),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async endAsk(code: string, body: any) {
    try {
      const response = await axios({
        method: 'PATCH',
        url: API.END_ASK(code),
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async getAskFeedback(code: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_ASK_FEEDBACK(code),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }

  static async reportAsk(code: string, message: string) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.REPORT_ASK_URL(code),
        data: {
          message,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
  }
}
