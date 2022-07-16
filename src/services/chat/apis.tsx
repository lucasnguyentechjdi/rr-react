import * as API from '~Root/private/api';

import {IPaginationRequest} from './../../types/index';
import axios from '~Root/services/axios';
import {handleResponse} from '../axios/handle';

/* eslint-disable @typescript-eslint/no-extraneous-class */
export default class ChatAPI {
  static async handleFetchChat() {
    return {
      message: '',
    };
  }

  static async getUserChatData({search = '', page = 1, limit = 10}) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_DATA_URL(search, page, limit),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getUserChatGroupData({search = '', page = 1, limit = 10}) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_GROUP_DATA_URL(search, page, limit),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getChatInfo(chatCode: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_INFO_URL(chatCode),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getChatMessageData({chatCode = '', page = 1, limit = 10}) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_MESSAGE_DATA_URL(chatCode, page, limit),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async sendChatMessage({chatCode = '', message = '', attachments = []}) {
    try {
      console.log(API.SEND_CHAT_MESSAGE_URL(chatCode));
      const response = await axios({
        method: 'POST',
        url: API.SEND_CHAT_MESSAGE_URL(chatCode),
        data: {
          message,
          attachments,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async sendActionNotification(chatCode = '', action = '') {
    try {
      let url = API.SEND_APPROVE_NOTIFICATION_URL(chatCode);
      if (action === 'reject') {
        url = API.SEND_REJECT_NOTIFICATION_URL(chatCode);
      }
      const response = await axios({
        method: 'PATCH',
        url,
        data: {},
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getNotification(chatCode = '') {
    try {
      console.log(API.GET_NOTIFICATION_URL(chatCode));
      const response = await axios({
        method: 'GET',
        url: API.GET_NOTIFICATION_URL(chatCode),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getChatApproved(userCode: string, params: IPaginationRequest & {status: string}) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.SWITCH_CHAT_WITH_USER_URL(userCode, params),
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
  }

  static async getTotalNewMessageCountWithUser(userCode: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_TOTAL_NEW_MESSAGE_WITH_USER_URL(userCode),
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
  }

  static async getChatByAskCode(askCode: string, params: IPaginationRequest & {status: string}) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.SWITCH_CHAT_BY_ASK_CODE_URL(askCode, params),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getChatBetweenTwoUser(withUserCode: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_WITH_USER_URL(withUserCode),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getSwitchChatBetweenTwoUser(withUserCode: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.SWITCH_CHAT_WITH_USER_URL(withUserCode),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response1111========>', response);
      return handleResponse(response);
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async createChatInNetwork(askCode: string) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.CREATE_CHAT_IN_NETWORK,
        data: {
          askCode,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return handleResponse(response, 'Created Chat Success');
    } catch (error) {
      console.log(error);
      return {
        data: '',
        message: 'error',
        success: false,
      };
    }
  }

  static async createGeneralChat(userCode: string) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.CREATE_CHAT_GENERAL,
        data: {
          userCode,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return handleResponse(response, 'Created Chat Success');
    } catch (error) {
      console.log(error);
      return {
        data: '',
        message: 'error',
        success: false,
      };
    }
  }

  static async createChatByShare(askCode: string) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.CREATE_CHAT_BY_SHARE,
        data: {
          askCode,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return handleResponse(response, 'Created Chat Success');
    } catch (error) {
      console.log(error);
      return {
        data: '',
        message: 'error',
        success: false,
      };
    }
  }

  static async updateNotificationReadCount(code: string, count: number) {
    try {
      const response = await axios({
        method: 'PATCH',
        url: API.UPDATE_NOTIFICATION_READ_COUNT(code, count),
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
  }
}
