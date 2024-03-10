import React from 'react';
import {TCity} from '../../types';
import classNames from 'classnames';

type TLocationItem = {
  city: TCity;
  activeCity: TCity;
  onCityItemClick: (city: TCity) => void;
}

export default function LocationItem({city, activeCity, onCityItemClick}: TLocationItem): React.JSX.Element {
  const handleClick = () => {
    onCityItemClick(city);
  };

  return (
    <li
      className="locations__item"
      onClick={handleClick}
    >
      <a
        className={classNames('locations__item-link tabs__item', {'tabs__item--active': city === activeCity})}
        href="#"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
