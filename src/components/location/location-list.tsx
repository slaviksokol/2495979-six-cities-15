import React from 'react';

import LocationItem from './location-item';
import {TCity} from '../../types';

export default function LocationList({cities}: {cities: TCity[]}): React.JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => (
            <LocationItem
              key={city.name}
              city={city}
            />
          ))
        }
      </ul>
    </section>
  );
}
