import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoutes} from '../../const';
import {TOffer} from '../../types';
import {useAppSelector} from '../../store/hooks';
import {offersSelectors} from '../../store/slices/offers';
import OfferCard from '../../pages/offers/offer-card';
import Map from '../../components/map/map';
import OffersSorting from '../../components/sort/sort';
import {getSortedOffers} from '../../utils/func';

export default function OffersList({nameBlock}: {nameBlock: string}): React.JSX.Element {
  const offers = useAppSelector(offersSelectors.selectOffers);
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const activeSortItem = useAppSelector(offersSelectors.selectSortItem);

  let offersFiltered = activeCity
    ? offers.filter((offer) => offer.city.name === activeCity.name)
    : offers;

  offersFiltered = getSortedOffers(offersFiltered, activeSortItem);

  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);
  const handleHover = (offer?: TOffer) => {
    setActiveOffer(offer || null);
  };

  const {pathname} = useLocation() as {pathname: AppRoutes};

  const isMainPage = pathname === AppRoutes.Main;
  const offerIdPageRegExp = /\/offer\/[\d+]/g;
  const isOfferIdPage: boolean = offerIdPageRegExp.test(pathname);

  const issetOffers = offersFiltered.length > 0;

  const classContainer = classNames(
    'container',
    {'cities__places-container': isMainPage},
    {'cities__places-container--empty': issetOffers}
  );
  const classSection = classNames(
    {'places': issetOffers},
    {'cities__no-places': !issetOffers},
    {'cities__places': isMainPage && issetOffers},
    {'near-places': isOfferIdPage && issetOffers}
  );
  const classH2 = classNames(
    {'visually': isMainPage},
    {'near-places__title': isOfferIdPage}
  );
  const classList = classNames(
    'places__list',
    {'cities__places-list tabs__content': isMainPage},
    {'near-places__list': isOfferIdPage}
  );

  return (
    <div className={classContainer}>
      <section className={classSection}>
        {
          issetOffers &&
          <h2 className={classH2}>{nameBlock}</h2>
        }
        {
          issetOffers &&
          isMainPage &&
          <>
            <b className="places__found">{Object.keys(offersFiltered).length} places to stay in Amsterdam</b>
            <OffersSorting />
          </>
        }
        {
          issetOffers &&
          <div className={classList}>
            {offersFiltered.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                handleHover={handleHover}
              />
            )) as React.JSX.Element[]}
          </div>
        }
        {
          !issetOffers &&
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property available at the moment in
              Dusseldorf
            </p>
          </div>
        }
      </section>
      {
        isMainPage &&
        <div className="cities__right-section">
          {
            issetOffers &&
            <Map className="cities__map" activeOffer={activeOffer} offers={offersFiltered} activeCity={activeCity} />
          }
        </div>
      }
    </div>
  );
}
