import {IResponse} from './types';
import i18n from 'i18next';

export const handleResponse = (response: IResponse, message?: string) => {
  if (!response?.data) {
    throw new Error(i18n.t('system_error'));
  }
  if (response.data.errCode) {
    return {
      data: response.data.errCode,
      message: response.data.errDetail,
      success: false,
    };
  }
  return {
    data: response.data.result,
    message: message ?? '',
    success: true,
  };
};
