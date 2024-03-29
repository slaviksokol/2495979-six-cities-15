import React from 'react';
import classNames from 'classnames';

import {TCity} from '../../types';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import {offersActions, offersSelectors} from '../../store/slices/offers';

export default function LocationItem({city}: {city: TCity}): React.JSX.Element {
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const isActive = activeCity === city;
  const {changeCity} = useActionCreators(offersActions);

  const handleClick = () => {
    if (!isActive) {
      changeCity(city);
    }
  };

  return (
    <li
      className="locations__item"
      onClick={handleClick}
    >
      <a
        className={classNames('locations__item-link tabs__item', {'tabs__item--active': isActive})}
        href="#"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
