import React, {useState, useEffect} from 'react';
import OfferCard from '../../pages/offers/offer-card';
import {TCity, TOffer} from '../../types';
import Map from '../../components/map/map';

type TOffersList = {
  offers: TOffer[];
  activeCity: TCity;
}

export default function OffersList({offers, activeCity}: TOffersList): React.JSX.Element {
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

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{Object.keys(offers).length} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              handleHover={handleHover}
            />
          )) as React.JSX.Element[]}
        </div>
      </section>
      <div className="cities__right-section">
        <Map activeOffer={activeOffer} offers={offers} activeCity={activeCity} />
      </div>
    </div>
  );
}
