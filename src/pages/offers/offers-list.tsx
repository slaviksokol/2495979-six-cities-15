import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoutes} from '../../const';
import {TCity, TOffer} from '../../types';
import OfferCard from '../../pages/offers/offer-card';
import Map from '../../components/map/map';
import OffersSorting from '../../components/offers/offers-sorting';

type TOffersList = {
  offers: TOffer[];
  activeCity: TCity;
  nameBlock: string;
}

export default function OffersList({offers, activeCity, nameBlock}: TOffersList): React.JSX.Element {
  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);
  const handleHover = (offer?: TOffer) => {
    setActiveOffer(offer || null);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('component did update');
  }, [offers]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeOffer);

    return () => {
      // eslint-disable-next-line no-console
      console.log('Component will unmount');
    };
  });

  const {pathname} = useLocation() as {pathname: AppRoutes};

  const isMainPage = pathname === AppRoutes.Main;
  const offerIdPageRegExp = /\/offer\/[\d+]/g;
  const isOfferIdPage: boolean = offerIdPageRegExp.test(pathname);

  const classContainer = classNames(
    'container',
    {'cities__places-container': isMainPage}
  );
  const classSection = classNames(
    'places',
    {'cities__places': isMainPage},
    {'near-places': isOfferIdPage}
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
        <h2 className={classH2}>{nameBlock}</h2>
        {
          isMainPage &&
          <>
            <b className="places__found">{Object.keys(offers).length} places to stay in Amsterdam</b>
            <OffersSorting />
          </>
        }
        <div className={classList}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              handleHover={handleHover}
            />
          )) as React.JSX.Element[]}
        </div>
      </section>
      {
        isMainPage &&
        <div className="cities__right-section">
          <Map className="cities__map" activeOffer={activeOffer} offers={offers} activeCity={activeCity} />
        </div>
      }
    </div>
  );
}
