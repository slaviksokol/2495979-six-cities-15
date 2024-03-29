import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {TAuthData, TUserData} from '../../types';
import {Endpoint} from '../../const';
import {removeToken, setToken} from '../../services/token';

export const checkAuthAction = createAsyncThunk<TUserData, void, { extra: AxiosInstance }>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    const response = await api.get<TUserData>(Endpoint.Login);
    return response.data;
  }
);

export const loginAction = createAsyncThunk<void, TAuthData, { extra: AxiosInstance }>(
  'login',
  async ({email, password}, {extra: api}) => {
    const response = await api.post<TUserData>(Endpoint.Login, {email, password});
    setToken(response.data.token ?? '');
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'logout',
  async (_arg, { extra: api }) => {
    await api.delete(Endpoint.Logout);
    removeToken();
  },
);
