import {Helmet} from 'react-helmet-async';
import React from 'react';

import FavoriteGroupCity from './favorite-group-city';
import {getOffersByCity} from '../../utils/func';
import {useAppSelector} from '../../store/hooks';
import {favoriteSelectors} from '../../store/slices/favorite';

function Favorites(): React.JSX.Element {
  const favorites = useAppSelector(favoriteSelectors.selectFavorites);
  const offersByCity = getOffersByCity(favorites);

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
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
