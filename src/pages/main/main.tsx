import React from 'react';

import OffersList from '../offers/offers-list';
import LocationList from '../../components/location/location-list';
import {cities} from '../../mocks/cities';

export default function Main(): React.JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationList cities={cities} />
      </div>
      <div className="cities">
        <OffersList nameBlock="Places" />
      </div>
    </main>
  );
}
