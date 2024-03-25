import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TCity, TOffer, TSortItem} from '../types';
import {sortOptions} from '../components/sort/const';
import {State} from './state';
import {fetchOffers} from './thunks/offers';
import {StatusLoading} from '../const';
import {getCitiesFromOffers} from '../utils/func';

type TOffersState = {
  city?: TCity;
  offers?: TOffer[];
  sort: TSortItem;
  statusLoading: StatusLoading;
}

const initialState: TOffersState = {
  sort: sortOptions[0],
  statusLoading: StatusLoading.None,
};

const offersSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        const offers = action.payload;
        if (offers.length) {
          state.city = getCitiesFromOffers(offers)[0] ?? [];
        }
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      }),
  initialState,
  name: 'offers',
  reducers: {
    changeCity: (state, action: PayloadAction<TCity>) => {
      state.city = action.payload;
    },
    getOffers: (state, action: PayloadAction<TOffer[]>) => {
      state.offers = action.payload;
    },
    changeSortOffers: (state, action: PayloadAction<TSortItem>) => {
      state.sort = action.payload;
    }
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = {
  selectCity: (state: State) => state.city ?? <TCity>{},
  selectOffers: (state: State) => state.offers ?? <TOffer[]>[],
  selectSortItem: (state: State) => state.sort ?? sortOptions[0],
  selectStatusLoading: (state: State) => state.statusLoading ?? StatusLoading.None,
};

export {offersSlice, offersActions, offersSelectors};
