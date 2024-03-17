import {createReducer} from '@reduxjs/toolkit';

import {TCity, TOffer} from '../types';
import {generateOffers} from '../mocks/offers';
import {cities} from '../mocks/cities';
import {changeCity, getOffers} from './action';

const offers: TOffer[] = generateOffers(50);

type TOffersState = {
  city: TCity;
  offers: TOffer[];
}

const initialState: TOffersState = {
  city: cities[0],
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    });
});
