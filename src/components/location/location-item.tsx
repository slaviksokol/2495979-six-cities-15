import React from 'react';
import classNames from 'classnames';

import {TCity} from '../../types';
import {useAppDispatch, useAppSelector} from '../../store';
import {offersActions, offersSelectors} from '../../store/reducer';

export default function LocationItem({city}: {city: TCity}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const isActive = activeCity === city;

  const handleClick = () => {
    if (!isActive) {
      dispatch(offersActions.changeCity(city));
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
