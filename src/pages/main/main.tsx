import React from 'react';
import OffersList from '../offers/offers-list';
import {TOffer} from '../../types';
import {cities} from '../../mocks/cities';
import LocationList from '../../components/location/location-list';

export default function Main({offers}: {offers: TOffer[]}): React.JSX.Element {
  const activeCity = cities[0];
  const offersFiltered = offers.filter((offer) => offer.city === activeCity);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationList offers={offers} activeCity={activeCity} />
      </div>
      <div className="cities">
        <OffersList offers={offersFiltered} activeCity={activeCity} />
      </div>
    </main>
  );
}
