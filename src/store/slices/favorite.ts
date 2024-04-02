import {createSlice} from '@reduxjs/toolkit';

import {State} from '../state';
import {AuthStatus, StatusLoading} from '../../const';
import {TOffer} from '../../types';
import {changeFavoriteAction, fetchFavoriteAction} from '../thunks/favorite';

type InitialState = {
  favorites: TOffer[] | null;
  statusLoading: StatusLoading;
}

const initialState: InitialState = {
  favorites: null,
  statusLoading: StatusLoading.None,
};

const favoriteSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.statusLoading = StatusLoading.Success;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.statusLoading = StatusLoading.Failed;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        const offerFavoriteData = action.payload;

        if (offerFavoriteData?.isFavorite) {
          state.favorites.push(offerFavoriteData);
        } else {
          state.favorites = state.favorites.filter(
            (item) => item.id !== offerFavoriteData.id
          );
        }
      }),
  initialState,
  name: 'favorite',
  reducers: {},
});

const favoriteActions = {...favoriteSlice.actions, fetchFavoriteAction, changeFavoriteAction};
const favoriteSelectors = {
  selectFavorites: (state: State) => state[favoriteSlice.name].favorites ?? null,
};

export {favoriteSlice, favoriteActions, favoriteSelectors};
