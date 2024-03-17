import {State} from './state';

const selectOffers = (state: State) => state.offers;
const selectCity = (state: State) => state.city;

export {selectCity, selectOffers};
