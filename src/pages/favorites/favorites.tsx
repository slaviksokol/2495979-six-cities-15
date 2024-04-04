import {Helmet} from 'react-helmet-async';
import React from 'react';
import classNames from 'classnames';

import FavoriteGroupCity from './favorite-group-city';
import {getOffersByCity} from '../../utils/func';
import {useAppSelector} from '../../store/hooks';
import {favoriteSelectors} from '../../store/slices/favorite';
import {StatusLoading} from '../../const';
import {Loader} from '../../components/loader';

function Favorites(): React.JSX.Element {
  const favorites = useAppSelector(favoriteSelectors.selectFavorites);
  const statusLoading = useAppSelector(favoriteSelectors.selectFavoritesStatus);
  const offersByCity = getOffersByCity(favorites);

  if (statusLoading !== StatusLoading.Success) {
    return <Loader />;
  }

  const issetFavorites = !!favorites.length;
  const title = !issetFavorites ? ' empty' : '';
  const mainClass = classNames(
    'page__main page__main--favorites',
    {'page__main--favorites-empty': !issetFavorites}
  );
  const sectionClass = classNames(
    'favorites',
    {'favorites--empty': !issetFavorites}
  );

  return (
    <main className={mainClass}>
      <Helmet>
        <title>6 cities: Favorites{title}</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className={sectionClass}>
          <h1 className="favorites__title">{issetFavorites ? 'Saved listing' : 'Favorites (empty)'}</h1>
          {
            issetFavorites &&
            <ul className="favorites__list">
              {
                offersByCity.map((group) => (
                  <FavoriteGroupCity key={group.city.name} city={group.city} offers={group.offers} />
                )) as React.JSX.Element[]
              }
            </ul>
          }
          {
            !issetFavorites &&
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          }
        </section>
      </div>
    </main>
  );
}

export default Favorites;
