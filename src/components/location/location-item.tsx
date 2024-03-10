import React from 'react';
import {TCity} from '../../types';
import classNames from 'classnames';

type TLocationItem = {
  city: TCity;
  activeCity: TCity;
}

export default function LocationItem({city, activeCity}: TLocationItem): React.JSX.Element {
  return (
    <li className="locations__item">
      <a
        className={classNames('locations__item-link tabs__item', {'tabs__item--active': city === activeCity})}
        href="#"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
