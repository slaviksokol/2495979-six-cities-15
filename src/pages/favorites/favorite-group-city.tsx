import React from 'react';
import {Link} from 'react-router-dom';

import OfferCard from '../offers/offer-card';
import {TOffersByCity} from '../../types';
import {AppRoutes} from '../../const.ts';
import {useActionCreators} from '../../store/hooks.ts';
import {offersActions} from '../../store/slices/offers.ts';

export default function FavoriteGroupCity({city, offers}: TOffersByCity): React.JSX.Element {
  const {changeCity} = useActionCreators(offersActions);

  const handleClick = React.useCallback(
    () => {
      changeCity(city.name);
    },
    [changeCity, city]
  );
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoutes.Main}
            onClick={handleClick}
          >
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
          />
        )) as React.JSX.Element[]}
      </div>
    </li>
  );
}
