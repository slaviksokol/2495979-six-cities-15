import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {Endpoint} from '../../const';
import {TOffer, TOfferDetail} from '../../types';

export const fetchOfferDetailAction = createAsyncThunk<TOfferDetail, string, { extra: AxiosInstance }>(
  'fetchOfferDetail',
  async (id, {extra: api}) => {
    const response = await api.get<TOfferDetail>(`${Endpoint.Offers}/${id}`);
    return response.data;
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<TOffer[], string, { extra: AxiosInstance }>(
  'fetchOffersNearby',
  async (offerId, {extra: api}) => {
    const response = await api.get<TOffer[]>(`${Endpoint.Offers}/${offerId}/nearby`);
    return response.data;
  }
);
