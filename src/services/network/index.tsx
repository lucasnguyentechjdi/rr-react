import axios from '~Root/services/axios';
import * as API from '~Root/private/api';
import { IResponse, IResult } from '../axios/types';
import { handleResponse } from '../axios/handle';

export const removeNetwork = async (userCode: string): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'DELETE',
      url: API.REMOVE_NETWORK_URL(userCode),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response========>', response);
    return handleResponse(response);
  } catch (error) {
    console.log('error=======', error);
    return {
      data: null,
      message: error,
      success: false,
    };
  }
};