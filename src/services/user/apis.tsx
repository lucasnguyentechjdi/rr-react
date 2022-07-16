/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
import {handleResponse} from '../axios/handle';

const data = [
  {
    id: '1',
    first_name: 'Ryan',
    last_name: 'Decker',
    myself: {
      industry: [],
      biztype: 'BLITZ FASHION DIRECTOR',
      self_intro:
        'I’m looking for a social media specialist who can help with spreading word about my newly launched Fashion campaign.\n\nThe campaigne is for women and men who are interested in sustainable fashion culture.',
    },
    profile_photo:
      'https://s3-alpha-sig.figma.com/img/4f45/57aa/f9a8d7ea9f5aad370d5e0737e965be27?Expires=1641772800&Signature=BDAe-KjHBo9UXKCrZyilmDTlJ2hDsfJyJljmpXa9Xg2c0iganzlGG0QAJs0RfgseJZvUkxpD2XOZNyOnLO9J-bu2SDYZrKQx9eMEzQt95RLRXom5fVtScyno5YB9-ELZXucp1hvDGd3Lyb5NpCs8tunkA7-K8fZZwrkw8cv6~uOyfjo2cmjjpYdYQxICxUPbIDku0Sctt50Ie65os4vqar6rxjBjIvfcZA~czhRDz0Rl4qdUI~ZnVUnC7IgC1HdPSurC53fr25u8UtD5Pm-AwMMXaKceJTiYInB4qPMEXq-igdFGC9fl70~UGbziUpu1ni0iUaknoJyNsB7i1rA3bg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    status: 1,
    date_invite: new Date('2021-12-15'),
  },
  {
    id: '2',
    first_name: 'Ron',
    last_name: 'Franklin',
    myself: {
      industry: [],
      biztype: 'IS LOOKING FOR A CLIENT',
      self_intro: 'I’m the social media director of SCARLET, which has a following of over 2 million woke millenials.',
    },
    profile_photo:
      'https://s3-alpha-sig.figma.com/img/a87a/97d0/53ea07ae8d7b3a5b055c1a5d3ac770da?Expires=1641772800&Signature=UaTBZt0~53XkSclrXGxAC74B6jgUrT-Soa9KpYeBqkpoAjwaKIfyMB2fVGe0vkbgoU-EbqjRpP2FKxL6a-apWIVHphS73bXTRGRZ4UF-BIyRr~5zJRMCkAhf0j-jODSO0GTL6nO~g4W9R6vub-5GQK6mlBpfJUrlN~DZBdPZT3HBFqTKoo~r1YCP5gczO~~Vz9Q6o76D2aK6zD4~IEQssP3OtXXU4kft3XwCPrZ~EMV2srkzY2IQpUdWpxhhGlh-ai6H7LcG7G1YLgMmDKeRNjunEquRjzW6s0Go2kbG4xC2ij1-OFpltDodCrlofUZXG8vCcpVEZc3CIFSkGmZxfw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    status: 1,
    date_invite: new Date('2021-12-15'),
  },
  {
    id: '3',
    first_name: 'Rosia',
    last_name: 'Joseph',
    myself: {
      industry: [],
      biztype: 'IS LOOKING FOR A CLIENT',
      self_intro: 'I’m the social media executive of SCARLET, which has a following of over 2 million woke millenials.',
    },
    profile_photo:
      'https://s3-alpha-sig.figma.com/img/788f/5fd7/15d462a997533a6133384d5ce8246bcf?Expires=1641772800&Signature=go1A2~o-KdXb~SKmK8d3H-7IjhYATJc7oe3nNCBrZr5duBHNZP0fpk39gfL7u4XqTWMlN2aMzHmJva0QFimiUrXdR-6BYlhngtpA7BKZh2vXHFLsI16Wr2X0gBRiIymNWK-y27HfVa6OIG5TSFgcguVNmOzydv3BuHSEk56gXV7wNJJrYKEZ2Hut2DmWmv~c82SRB1Qk0mLSEnKd2d6s9~t7Cy4odJEIxXitkeMBhCBKWgkU8rxnV8w-BWt6zRpB5fXmUS5DnDQ7t~vnnI2UrkPEl~WXZWDrenpkuypFVefRQyY9yS1eSVnXPTGEO4P0Ir-5Tl6aUJl00GBxilIsEQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    status: 1,
    date_invite: new Date('2021-12-15'),
  },
  {
    id: '4',
    first_name: 'Ryan 1',
    last_name: 'Decker 1',
    myself: {
      industry: [],
      biztype: 'BLITZ FASHION DIRECTOR',
      self_intro:
        'I’m looking for a social media specialist who can help with spreading word about my newly launched Fashion campaign.\n\nThe campaigne is for women and men who are interested in sustainable fashion culture.',
    },
    profile_photo:
      'https://s3-alpha-sig.figma.com/img/4f45/57aa/f9a8d7ea9f5aad370d5e0737e965be27?Expires=1641772800&Signature=BDAe-KjHBo9UXKCrZyilmDTlJ2hDsfJyJljmpXa9Xg2c0iganzlGG0QAJs0RfgseJZvUkxpD2XOZNyOnLO9J-bu2SDYZrKQx9eMEzQt95RLRXom5fVtScyno5YB9-ELZXucp1hvDGd3Lyb5NpCs8tunkA7-K8fZZwrkw8cv6~uOyfjo2cmjjpYdYQxICxUPbIDku0Sctt50Ie65os4vqar6rxjBjIvfcZA~czhRDz0Rl4qdUI~ZnVUnC7IgC1HdPSurC53fr25u8UtD5Pm-AwMMXaKceJTiYInB4qPMEXq-igdFGC9fl70~UGbziUpu1ni0iUaknoJyNsB7i1rA3bg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    status: 1,
    date_invite: new Date('2021-12-15'),
  },
];

export default class UserAPI {
  static async handleUserInfo() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.USER_INFO_URL,
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

  static async getUserRefer(payload: string) {
    let dataResponse = [...data];
    if (payload) {
      dataResponse = data.filter(
        x =>
          x?.first_name?.toLowerCase().includes(payload?.toLowerCase()) ||
          x?.last_name?.toLowerCase().includes(payload?.toLowerCase()),
      );
    }

    return {
      payload: {
        data: dataResponse,
        message: '',
        success: true,
      },
    };
  }

  static async updateUserAvatar(payload: any) {
    try {
      console.log('payload========>', payload);
      const response = await axios({
        method: 'POST',
        url: API.USER_INFO_URL,
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response========>', response);
      if (!response?.data) {
        throw new Error(i18n.t('not_match'));
      }
      return {
        data: response.data,
        message: '',
        success: true,
      };
    } catch (error) {
      console.log('error=======', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async updateUserProfile(payload: any) {
    try {
      const response = await axios({
        method: 'PATCH',
        url: API.USER_INFO_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

  static async getUserInviteData() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.INVITE_DATA_URL,
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

  static async getUserNetworkData() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.NETWORK_DATA_URL,
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

  static async getUserAskData({page = 1, limit = 10}) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.ASK_DATA_URL(page, limit),
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

  static async forgotPassword(email: string) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.FORGOT_PASSWORD_URL,
        data: {
          email,
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

  static async verifyForgotPassword(email: string, tempPassword: string, password = '', confirmPassword = '') {
    try {
      const response = await axios({
        method: 'POST',
        url: API.VERIFY_FORGOT_PASSWORD_URL,
        data: {
          email,
          tempPassword,
          password,
          confirmPassword,
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

  static async getInviteLink(code: string) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.INVITE_LINK_URL(code),
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

  static async trackingUserActivity(action: string, data: any) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.CREATE_USER_ACTIVITY,
        data: {
          action,
          data,
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
