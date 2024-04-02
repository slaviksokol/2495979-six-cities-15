import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import classNames from 'classnames';

import {AppRoutes} from '../../const';
import {TOffer} from '../../types';
import OfferCard from '../../pages/offers/offer-card';
import Map from '../../components/map/map';
import OffersSorting from '../../components/sort/sort';

type TOffersList = {
  nameBlock: string;
  offers: TOffer[] | null;
  isOfferDetail?: boolean;
}

export default function OffersList({nameBlock, offers, isOfferDetail = false}: TOffersList): React.JSX.Element {
  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);
  const handleHover = (offer?: TOffer) => {
    setActiveOffer(offer || null);
  };

  const {pathname} = useLocation() as {pathname: AppRoutes};

  const isMainPage = pathname === AppRoutes.Main;

  const issetOffers = offers ? offers.length > 0 : false;

  const classContainer = classNames(
    'container',
    {'cities__places-container': isMainPage},
    {'cities__places-container--empty': issetOffers}
  );
  const classSection = classNames(
    {'places': issetOffers},
    {'cities__no-places': !issetOffers},
    {'cities__places': isMainPage && issetOffers},
    {'near-places': isOfferDetail && issetOffers}
  );
  const classH2 = classNames(
    {'visually': isMainPage},
    {'near-places__title': isOfferDetail}
  );
  const classList = classNames(
    'places__list',
    {'cities__places-list tabs__content': isMainPage},
    {'near-places__list': isOfferDetail}
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
            <b className="places__found">{offers?.length} places to stay in Amsterdam</b>
            <OffersSorting />
          </>
        }
        {
          issetOffers &&
          <div className={classList}>
            {offers?.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                handleHover={handleHover}
                isOfferDetail
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
            offers &&
            <Map className="cities__map" activeOffer={activeOffer} offers={offers} />
          }
        </div>
      }
    </div>
  );
}
