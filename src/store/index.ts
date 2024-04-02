import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {offersSlice} from './slices/offers';
import {createApi} from '../services/api';
import {userSlice} from './slices/user';
import {offerDetailSlice} from './slices/offer-detail';
import {commentsSlice} from './slices/comments';
import {favoriteSlice} from './slices/favorite';

export const api = createApi();

const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [offerDetailSlice.name]: offerDetailSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
