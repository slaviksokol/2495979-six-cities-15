import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {TOffer} from '../../types';
import {Endpoint} from '../../const';

export const fetchFavoriteAction = createAsyncThunk<TOffer[], void, { extra: AxiosInstance }>(
  'fetchFavorite',
  async (_arg, {extra: api}) => {
    const response = await api.get<TOffer[]>(`${Endpoint.Favorite}`);
    return response.data;
  }
);

type TFavoriteChange = {
  offerId: string;
  status: number;
}

export const changeFavoriteAction = createAsyncThunk<TOffer, TFavoriteChange, { extra: AxiosInstance }>(
  'changeFavorite',
  async ({ offerId, status }, {extra: api}) => {
    const response = await api.post<TOffer>(`${Endpoint.Favorite}/${offerId}/${status}`);
    return response.data;
  }
);
