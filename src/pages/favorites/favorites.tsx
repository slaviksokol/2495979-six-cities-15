import React from 'react';
import {TOffer} from '../../types';
import FavoriteGroupCity from './favorite-group-city';
import {getOffersByCity} from '../../utils/func';

function Favorites({offers}: {offers: TOffer[]}): React.JSX.Element {
  const offersByCity = getOffersByCity(offers);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              offersByCity.map((group) => (
                <FavoriteGroupCity key={group.city.name} city={group.city} offers={group.offers} />
              )) as React.JSX.Element[]
            }
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
