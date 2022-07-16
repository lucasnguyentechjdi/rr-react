import axios, {AxiosRequestConfig} from 'axios';
import {getToken} from '~Root/services/storage';

// Add a request interceptor
axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await getToken();
    if (!config.headers) return config;
    if (token) {
      config.headers.token = token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  async (error: any) => {
    return await Promise.reject(error);
  },
);

export default axios;
// Add a response interceptor

// axios.interceptors.response.use((response) => {
//   return response
// }, function (error) {
//   const originalRequest = error.config;

//   if (error.response.status === 401 && originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token') {
//     return Promise.reject(error);
//   }

//   if (error.response.status === 401 && !originalRequest._retry) {

//     originalRequest._retry = true;
//     const refreshToken = localStorageService.getRefreshToken();
//     return axios.post('/auth/token',
//       {
//         "refresh_token": refreshToken
//       })
//       .then(res => {
//         if (res.status === 201) {
//           localStorageService.setToken(res.data);
//           axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//           return axios(originalRequest);
//         }
//       })
//   }
//   return Promise.reject(error);
// });
