import React from 'react';
import OfferCard from '../offers/offer-card';
import {TOffer} from '../../types';

type TFavoriteGroupCityParams = {
  cityName: string;
  offers: TOffer[];
}

export default function FavoriteGroupCity({cityName, offers}: TFavoriteGroupCityParams): React.JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
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
