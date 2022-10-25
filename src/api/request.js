import axios from 'axios';
// eslint-disable-next-line no-unused-vars
// import { Message } from 'element-ui';
// eslint-disable-next-line import/extensions
// import { getToken, setToken } from '@/utils/auth.js';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, 
  timeout: 30000, // request timeout
  headers: { 'Content-Type': 'application/json' },
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // const token = getToken();
    // if (token) {
    //   // eslint-disable-next-line no-param-reassign
    //   config.headers.common.Authorization = token;
    // }

    // eslint-disable-next-line no-param-reassign
    config.data = JSON.stringify(config.data);
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // if (response.headers.authorization) {
    //   setToken(response.headers.authorization);
    // }
    const res = response.data;
    return res;
  },
  (error) => {
    const rest = error.response;
    // Message({ message: 'Api Error, Please Try Again!', type: 'error' })
    return Promise.reject(error);
  },
);

export default service;
