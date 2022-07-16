import * as API from '~Root/private/api';

import {IActionCreateChatExternal, IActionCreateChatInternal, IActionGetFeedRequest} from './types';

import axios from '~Root/services/axios';
import {handleResponse} from '../axios/handle';
import i18n from 'i18next';

/* eslint-disable @typescript-eslint/no-extraneous-class */

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class FeedAPI {
  static async getAsk(userCode: string) {
    try {
      const response: any = await axios({
        method: 'get',
        url: API.ASK_DATA_URL(1, 50, userCode),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.log(error);
      return {
        data: '',
        message: i18n.t('not_match'),
        success: false,
      };
    }
  }

  static async createChatInNetwork(data: IActionCreateChatInternal['payload']) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.CREATE_CHAT_IN_NETWORK,
        data,
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
        message: i18n.t('not_match'),
        success: false,
      };
    }
  }

  static async createChatForIntroduce(data: IActionCreateChatExternal['payload']) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.CREATE_CHAT_FOR_INTRODUCE,
        data,
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
        message: i18n.t('not_match'),
        success: false,
      };
    }
  }

  static async getAskInNetWork(data: IActionGetFeedRequest['payload']) {
    try {
      const response: any = await axios({
        method: 'get',
        url: data.filter===true? API.GET_ASK_IN_NETWORK(1, 50, "true") : API.GET_ASK_IN_NETWORK(1, 50),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.log(error);
      return {
        data: '',
        message: i18n.t('not_match'),
        success: false,
      };
    }
  }
}
