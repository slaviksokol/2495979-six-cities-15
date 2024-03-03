import React from 'react';
import {TOffer} from '../../types';
import FavoriteGroupCity from './favorite-group-city';

type TOffersByCity = {
  cityName: string;
  offers: TOffer[];
}

function Favorites({offers}: {offers: TOffer[]}): React.JSX.Element {
  const offersByCity: TOffersByCity[] = [];
  offers.forEach((offer) => {
    const cityIndex:number = offersByCity.findIndex((city) => city.cityName === offer.city.name);
    if (cityIndex !== -1) {
      offersByCity[cityIndex].offers.push(offer);
    } else {
      offersByCity.push({cityName: offer.city.name, offers: [offer]});
    }
  });

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              offersByCity.map((city) => (
                // eslint-disable-next-line react/jsx-key
                <FavoriteGroupCity cityName={city.cityName} offers={city.offers} />
              )) as React.JSX.Element[]
            }
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
