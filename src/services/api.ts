import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

import {getToken} from './token';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  details?: {messages: string[]}[];
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayErrorMessage = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayErrorMessage(error.response)) {
        const detailMessage = (error.response.data);
        let message = detailMessage.message;
        if (
          detailMessage.details
          && detailMessage.details.length
          && detailMessage.details[0]
          && detailMessage.details[0].messages
          && detailMessage.details[0].messages.length
        ) {
          message = detailMessage.details[0].messages[0];
        }
        toast.warn(message);
      }

      throw error;
    }
  );

  return api;
};
