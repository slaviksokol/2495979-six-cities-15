import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {offersSlice} from './slices/offers';
import {createApi} from '../services/api';
import {userSlice} from './slices/user';

export const api = createApi();

const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
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
