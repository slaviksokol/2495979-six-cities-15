import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {Endpoint} from '../../const';
import {TOffer} from '../../types';

export const fetchOffersAction = createAsyncThunk<TOffer[], void, { extra: AxiosInstance }>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const response = await api.get<TOffer[]>(Endpoint.Offers);
    return response.data;
  }
);
