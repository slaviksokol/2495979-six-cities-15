import {State} from './state';

const selectOffers = (state: State) => state.offers;
const selectCity = (state: State) => state.city;
const selectSortItem = (state: State) => state.sort;

export {selectCity, selectOffers, selectSortItem};
