import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {TComment} from '../../types';
import {Endpoint} from '../../const';

export const fetchCommentsAction = createAsyncThunk<TComment[], string, { extra: AxiosInstance }>(
  'fetchComments',
  async (id, {extra: api}) => {
    const response = await api.get<TComment[]>(`${Endpoint.Comments}/${id}`);
    return response.data;
  }
);

type TCommentToSend = {
  offerId: string;
  commentData: {
    comment: string;
    rating: number;
  };
}

export const postCommentAction = createAsyncThunk<TComment, TCommentToSend, { extra: AxiosInstance }>(
  'postComment',
  async ({ offerId, commentData }, {extra: api}) => {
    const response = await api.post<TComment>(`${Endpoint.Comments}/${offerId}`, commentData);
    return response.data;
  }
);


