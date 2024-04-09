import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {useActionCreators, useAppSelector} from '../../store/hooks';
import {offersActions, offersSelectors} from '../../store/slices/offers';
import {AppRoutes} from '../../const.ts';

export default function LocationItem({cityName}: { cityName: string }): React.JSX.Element {
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const isActive = activeCity === cityName;
  const {changeCity} = useActionCreators(offersActions);

  const handleClick = React.useCallback(
    () => {
      if (!isActive) {
        changeCity(cityName);
      }
    },
    [changeCity, cityName, isActive]
  );

  return (
    <li
      className="locations__item"
    >
      <Link
        className={classNames('locations__item-link tabs__item', {'tabs__item--active': isActive})}
        onClick={handleClick}
        to={AppRoutes.Main}
      >
        <span>{cityName}</span>
      </Link>
    </li>
  );
}
