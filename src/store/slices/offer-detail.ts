import {createSlice} from '@reduxjs/toolkit';

import {TOffer, TOfferDetail} from '../../types';
import {State} from '../state';
import {MAX_NEAR_OFFERS, StatusLoading} from '../../const';
import {fetchOfferDetailAction, fetchOffersNearbyAction} from '../thunks/offer-detail';

type TOfferDetailState = {
  offer?: TOfferDetail;
  offersNearby?: TOffer[];
  statusLoading: StatusLoading;
}

const initialState: TOfferDetailState = {
  statusLoading: StatusLoading.None,
};

const offerDetailSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOfferDetailAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchOfferDetailAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOfferDetailAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      }),
  initialState,
  name: 'offer-detail',
  reducers: {},
});

const offerDetailActions = {...offerDetailSlice.actions, fetchOfferDetailAction, fetchOffersNearbyAction};
const offerDetailSelectors = {
  selectOffer: (state: State) => state[offerDetailSlice.name].offer,
  selectOffersNearby: (state: State) => {
    let offersNearby = state[offerDetailSlice.name].offersNearby ?? null;
    if (offersNearby) {
      offersNearby = offersNearby.slice(0, MAX_NEAR_OFFERS);
    }
    return offersNearby;
  },
  selectStatusLoading: (state: State) => state[offerDetailSlice.name].statusLoading,
};

export {offerDetailSlice, offerDetailActions, offerDetailSelectors};
