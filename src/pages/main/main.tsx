import React, {useState} from 'react';

import {TCity, TOffer} from '../../types';
import {cities} from '../../mocks/cities';
import OffersList from '../offers/offers-list';
import LocationList from '../../components/location/location-list';

export default function Main({offers}: {offers: TOffer[]}): React.JSX.Element {
  const [activeCity, setActiveCity] = useState<TCity>(cities[0]);

  function onCityItemClick(selectedCity: TCity): void {
    cities.some((city) => {
      if (city === selectedCity) {
        setActiveCity(selectedCity);
        return true;
      }
      return false;
    });
  }

  const offersFiltered = offers.filter((offer) => offer.city === activeCity);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationList offers={offers} activeCity={activeCity} onCityItemClick={onCityItemClick} />
      </div>
      <div className="cities">
        <OffersList offers={offersFiltered} activeCity={activeCity} nameBlock="Places" />
      </div>
    </main>
  );
}
