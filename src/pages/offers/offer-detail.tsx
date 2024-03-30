import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {getRatingWidth} from '../../utils/func';
import Error404 from '../Error404';
import Reviews from '../../components/review/review';
import Map from '../../components/map/map';
import OffersList from './offers-list';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import {offerDetailActions, offerDetailSelectors} from '../../store/slices/offer-detail';
import {StatusLoading} from '../../const';
import {offersSelectors} from '../../store/slices/offers';
import {Loader} from '../../components/loader';
import {commentsActions, commentsSelectors} from '../../store/slices/comments';
import {TOffer} from '../../types';

function OfferDetail(): React.JSX.Element {
  const {id} = useParams();
  const statusLoading = useAppSelector(offersSelectors.selectStatusLoading);
  const {fetchOfferDetailAction, fetchOffersNearbyAction} = useActionCreators(offerDetailActions);
  const {fetchCommentsAction} = useActionCreators(commentsActions);

  const offers = useAppSelector(offersSelectors.selectOffers);
  const curOffer = useAppSelector(offerDetailSelectors.selectOffer);
  const nearOffers = useAppSelector(offerDetailSelectors.selectOffersNearby);
  const comments = useAppSelector(commentsSelectors.selectComments);

  useEffect(() => {
    if (id) {
      fetchOfferDetailAction(id);
      fetchOffersNearbyAction(id);
      fetchCommentsAction(id);
    }
  }, [fetchCommentsAction, fetchOfferDetailAction, fetchOffersNearbyAction, id]);

  if (statusLoading === StatusLoading.Loading) {
    return <Loader />;
  }

  if (!curOffer) {
    return <Error404 type='offer'/>;
  }

  let nearOffersMap = [offers.find((offer) => offer.id === curOffer.id)] as TOffer[];
  if (nearOffers) {
    nearOffersMap = [...nearOffersMap, ...nearOffers];
  }

  const commentsCount = comments ? comments.length : 0;

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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsCount}</span></h2>
              <Reviews />
            </section>
          </div>
        </div>
        <Map className="offer__map" activeOffer={curOffer} offers={nearOffersMap} />
      </section>
      <OffersList nameBlock="Other places in the neighbourhood" offers={nearOffers} isOfferDetail />
    </main>
  );
}

export default OfferDetail;
