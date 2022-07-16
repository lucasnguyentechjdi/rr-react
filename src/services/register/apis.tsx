import * as API from '~Root/private/api';

import {IActionRegisterRequested, IActionVerifyOTP} from './types';

/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';
import {handleResponse} from '../axios/handle';

export default class RegisterAPI {
  static async handleRegister(payload: IActionRegisterRequested['payload']) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.REGISTER_URL,
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

  static async verifyCode(payload: string) {
    try {
      const response: any = await axios({
        method: 'get',
        url: API.CHECK_INVITE_CODE(payload),
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

  static async resendVerifyCode(payload: {email: string}) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.RESEND_VERIFY_CODE,
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

  static async accountVerify(payload: IActionVerifyOTP['payload']) {
    try {
      const response: any = await axios({
        method: 'post',
        url: API.ACCOUNT_VERIFY,
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
