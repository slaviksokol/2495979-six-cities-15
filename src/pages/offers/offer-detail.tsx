import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import {getRatingWidth} from '../../utils/func';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import Error404 from '../Error404';
import {AppRoutes, AuthStatus, MAX_NEAR_OFFERS, StatusLoading} from '../../const';
import {offerDetailActions, offerDetailSelectors} from '../../store/slices/offer-detail';
import {commentsActions, commentsSelectors} from '../../store/slices/comments';
import {offersActions, offersSelectors} from '../../store/slices/offers';
import {Loader} from '../../components/loader';
import Reviews from '../../components/review/review';
import Map from '../../components/map/map';
import OffersList from './offers-list';
import {TOffer} from '../../types';
import {favoriteActions, favoriteSelectors} from '../../store/slices/favorite';
import {userSelectors} from '../../store/slices/user';

function OfferDetail(): React.JSX.Element {
  const {id} = useParams();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);
  const {fetchOfferDetailAction, fetchOffersNearbyAction} = useActionCreators(offerDetailActions);
  const {fetchCommentsAction} = useActionCreators(commentsActions);
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const {changeCity} = useActionCreators(offersActions);

  const curOffer = useAppSelector(offerDetailSelectors.selectOffer);
  let nearOffers = useAppSelector(offerDetailSelectors.selectOffersNearby);
  const statusLoading = useAppSelector(offerDetailSelectors.selectStatusLoading);
  const comments = useAppSelector(commentsSelectors.selectComments);

  const favorites = useAppSelector(favoriteSelectors.selectFavorites);
  const {changeFavoriteAction} = useActionCreators(favoriteActions);

  useEffect(() => {
    if (id) {
      fetchOfferDetailAction(id);
      fetchOffersNearbyAction(id);
      fetchCommentsAction(id);
    }
  }, [fetchCommentsAction, fetchOfferDetailAction, fetchOffersNearbyAction, id]);

  useEffect(() => {
    if (curOffer && curOffer.city !== activeCity) {
      changeCity(curOffer.city);
    }
  }, [activeCity, changeCity, curOffer]);

  if (statusLoading !== StatusLoading.Success) {
    return <Loader />;
  }

  if (!curOffer) {
    return <Error404 type='offer'/>;
  }

  const isFavorite = favorites?.some((item) => item.id === curOffer.id);

  const handlerFavoriteClick = () => {
    if (authorizationStatus === AuthStatus.NoAuth) {
      return navigate(AppRoutes.Login);
    }

    changeFavoriteAction({
      offerId: curOffer.id,
      status: isFavorite ? 0 : 1,
    });
  };

  let nearOffersMap = [curOffer] as TOffer[];
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
            {
              curOffer.isPremium &&
              <div className="offer__mark"><span>Premium</span></div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {curOffer.title}
              </h1>
              <button
                className={`offer__bookmark-button${isFavorite ? ' offer__bookmark-button--active' : ''} button`}
                type="button"
                onClick={handlerFavoriteClick}
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
                {
                  curOffer?.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))
                }
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
