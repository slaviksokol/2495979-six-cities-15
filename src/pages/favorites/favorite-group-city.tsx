import React from 'react';
import OfferCard from '../offers/offer-card';
import {TOffersByCity} from '../../types';

export default function FavoriteGroupCity({city, offers}: TOffersByCity): React.JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city.name}</span>
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
