import React from 'react';
import classNames from 'classnames';

import {offersSelectors} from '../../store/slices/offers';
import {useAppSelector} from '../../store/hooks';
import Offers from '../offers/offers.tsx';
import Location from '../../components/location/location';
import {StatusLoading} from '../../const';
import {Loader} from '../../components/loader/loader';
import {getSortedOffers} from '../../utils/func';

export default function Main(): React.JSX.Element {
  const statusLoading = useAppSelector(offersSelectors.selectStatusLoading);
  const offers = useAppSelector(offersSelectors.selectOffers);

  const activeCity = useAppSelector(offersSelectors.selectCity);
  const activeSortItem = useAppSelector(offersSelectors.selectSortItem);

  let offersFiltered = activeCity
    ? offers.filter((offer) => offer.city.name === activeCity)
    : offers;

  offersFiltered = getSortedOffers(offersFiltered, activeSortItem);

  if (statusLoading === StatusLoading.Loading) {
    return <Loader />;
  }

  const pageMainClass = classNames(
    'page__main page__main--index',
    {'page__main--index-empty': offersFiltered.length === 0}
  );

  return (
    <main className={pageMainClass}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Location />
      </div>
      <div className="cities">
        <Offers nameBlock="Places" offers={offersFiltered} />
      </div>
    </main>
  );
}
