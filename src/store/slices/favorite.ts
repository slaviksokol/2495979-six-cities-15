import {createSlice} from '@reduxjs/toolkit';

import {State} from '../state';
import {StatusLoading} from '../../const';
import {TOffer} from '../../types';
import {changeFavoriteAction, fetchFavoriteAction} from '../thunks/favorite';

type InitialState = {
  favorites: TOffer[] | [];
  statusLoading: StatusLoading;
}

const initialState: InitialState = {
  favorites: [],
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
        state.statusLoading = StatusLoading.Failed;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        const offerFavoriteData = action.payload as TOffer | null;
        if (offerFavoriteData?.isFavorite) {
          state.favorites.push(offerFavoriteData);
        } else if (offerFavoriteData) {
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
  selectFavorites: (state: State) => state[favoriteSlice.name].favorites,
};

export {favoriteSlice, favoriteActions, favoriteSelectors};
