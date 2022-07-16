/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
import {IActionResetPasswordRequested} from './types';

export default class ResetPasswordAPI {
  static async handleResetPassword(payload: IActionResetPasswordRequested['payload']) {
    try {
      const response = await axios({
        method: 'post',
        url: API.LOGIN_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.data?.status && response?.data?.status !== 200) {
        throw new Error(i18n.t('not_match'));
      }
      return {
        data: response.data,
        message: '',
        success: true,
      };
    } catch (error) {
      return {
        data: '',
        message: error,
        success: false,
      };
    }
  }
}
