import React from 'react';
import {useParams} from 'react-router-dom';

import {AuthStatus} from '../../const';
import {getRatingWidth, getNearOffers} from '../../utils/func';
import {TOffer} from '../../types';
import Error404 from '../Error404';
import Reviews from '../../components/review/review';
import Map from '../../components/map/map';
import OffersList from './offers-list';

function OfferDetail({offers, authStatus}: {offers: TOffer[]; authStatus: AuthStatus}): React.JSX.Element {
  const {id} = useParams();
  const curOffer = offers.find((offer: TOffer) => offer.id === id);

  if (!curOffer) {
    return <Error404 type='offer'/>;
  }

  const nearOffers = getNearOffers(offers, curOffer);
  const nearOffersMap = [curOffer, ...nearOffers];

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              curOffer.images.map((src, index) => (
                <div className="offer__image-wrapper" key={src}>
                  <img
                    className="offer__image"
                    src={src}
                    alt={`Photo ${index}`}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {curOffer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {curOffer.title}
              </h1>
              <button
                className={`offer__bookmark-button${curOffer.isFavorite ? ' offer__bookmark-button--active' : ''} button`}
                type="button"
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: getRatingWidth(curOffer.rating)}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">
                {curOffer.rating}
              </span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {curOffer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {curOffer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {curOffer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{curOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                <li className="offer__inside-item">
                  Wi-Fi
                </li>
                <li className="offer__inside-item">
                  Washing machine
                </li>
                <li className="offer__inside-item">
                  Towels
                </li>
                <li className="offer__inside-item">
                  Heating
                </li>
                <li className="offer__inside-item">
                  Coffee machine
                </li>
                <li className="offer__inside-item">
                  Baby seat
                </li>
                <li className="offer__inside-item">
                  Kitchen
                </li>
                <li className="offer__inside-item">
                  Dishwasher
                </li>
                <li className="offer__inside-item">
                  Cabel TV
                </li>
                <li className="offer__inside-item">
                  Fridge
                </li>
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={curOffer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {curOffer.host.name}
                </span>
                <span className="offer__user-status">
                  {curOffer.host.isPro ? 'Pro' : ''}
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {curOffer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{curOffer.reviews.length}</span></h2>
              <Reviews authStatus={authStatus} reviews={curOffer.reviews}/>
            </section>
          </div>
        </div>
        <Map className="offer__map" activeOffer={curOffer} offers={nearOffersMap} activeCity={curOffer.city} />
      </section>
      <OffersList nameBlock="Other places in the neighbourhood" />
    </main>
  );
}

export default OfferDetail;
