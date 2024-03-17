import React from 'react';

import {getOffersByCity} from '../../utils/func';
import {TCity, TOffer} from '../../types';
import LocationItem from './location-item';

type TLocationList = {
  offers: TOffer[];
  activeCity: TCity;
  onCityItemClick: (city: TCity) => void;
}

export default function LocationList({offers, activeCity, onCityItemClick}: TLocationList): React.JSX.Element {
  const offersByCity = getOffersByCity(offers);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          offersByCity.map((group) => (
            <LocationItem
              key={group.city.name}
              city={group.city}
              active={group.city === activeCity}
              onCityItemClick={onCityItemClick}
            />
          ))
        }
      </ul>
    </section>
  );
}
