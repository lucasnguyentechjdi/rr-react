import axios from '~Root/services/axios';
import * as API from '~Root/private/api';
import {IResponse, IResult} from '../axios/types';
import {handleResponse} from '../axios/handle';

export const uploadImage = async (payload: any): Promise<IResult> => {
  try {
    console.log(payload);
    const response: IResponse = await axios({
      method: 'POST',
      url: API.UPLOAD_IMAGE_URL,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
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

export const downloadImage = async (file: string): Promise<IResult> => {
  try {
    const response: IResponse = await axios({
      method: 'GET',
      url: API.DOWNLOAD_IMAGE_URL(file),
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
};

export const imageUrl = (file: string) => {
  if (file.includes('file://')) {
    return file;
  }
  return API.DOWNLOAD_IMAGE_URL(file);
};
