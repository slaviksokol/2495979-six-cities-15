import React from 'react';
import classNames from 'classnames';

import {TCity} from '../../types';

type TLocationItem = {
  city: TCity;
  active: boolean;
  onCityItemClick: (city: TCity) => void;
}

export default function LocationItem({city, active, onCityItemClick}: TLocationItem): React.JSX.Element {
  const handleClick = () => {
    onCityItemClick(city);
  };

  return (
    <li
      className="locations__item"
      onClick={handleClick}
    >
      <a
        className={classNames('locations__item-link tabs__item', {'tabs__item--active': active})}
        href="#"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
