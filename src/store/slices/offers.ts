import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TCity, TOffer, TSortItem} from '../../types';
import {sortOptions} from '../../components/sort/const';
import {State} from '../state';
import {fetchOffersAction} from '../thunks/offers';
import {StatusLoading} from '../../const';
import {getCitiesFromOffers} from '../../utils/func';

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
      .addCase(fetchOffersAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        const offers = action.payload;
        if (offers.length) {
          state.city = getCitiesFromOffers(offers)[0] ?? [];
        }
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
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
    },
  },
});

const offersActions = {...offersSlice.actions, fetchOffersAction};
const offersSelectors = {
  selectCity: (state: State) => state[offersSlice.name].city ?? null,
  selectOffers: (state: State) => state[offersSlice.name].offers ?? <TOffer[]>[],
  selectSortItem: (state: State) => state[offersSlice.name].sort ?? sortOptions[0],
  selectStatusLoading: (state: State) => state[offersSlice.name].statusLoading ?? StatusLoading.None,
};

export {offersSlice, offersActions, offersSelectors};
