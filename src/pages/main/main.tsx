import React from 'react';
import classNames from 'classnames';

import {offersSelectors} from '../../store/reducer';
import {useAppSelector} from '../../store';
import OffersList from '../offers/offers-list';
import LocationList from '../../components/location/location-list';
import {StatusLoading} from '../../const';
import {Loader} from '../../components/loader';
import {getCitiesFromOffers} from '../../utils/func';

export default function Main(): React.JSX.Element {
  const statusLoading = useAppSelector(offersSelectors.selectStatusLoading);
  const offers = useAppSelector(offersSelectors.selectOffers);

  const cities = getCitiesFromOffers(offers) ?? [];

  const pageMainClass = classNames(
    'page__main page__main--index',
    {'page__main--index-empty': offers.length === 0}
  );
  return (
    <main className={pageMainClass}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationList cities={cities} />
      </div>
      <div className="cities">
        {
          statusLoading === StatusLoading.Loading
            ? <Loader />
            : <OffersList nameBlock="Places" />
        }
      </div>
    </main>
  );
}
