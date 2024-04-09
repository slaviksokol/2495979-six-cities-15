import React from 'react';

import LocationItem from './location-item';
import {CITIES} from '../../const.ts';

export default function Location(): React.JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((cityName) => (
            <LocationItem
              key={cityName}
              cityName={cityName}
            />
          ))
        }
      </ul>
    </section>
  );
}
