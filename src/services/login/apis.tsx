/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
import {IActionLoginRequested} from './types';
import {handleResponse} from '../axios/handle';

export default class LoginAPI {
  static async handleLogin(payload: IActionLoginRequested['payload']) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.LOGIN_URL,
        data: payload,
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
