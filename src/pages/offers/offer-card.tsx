import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {AppRoutes, AuthStatus} from '../../const';
import {capitalizeFirstLetter, getRatingWidth} from '../../utils/func';
import {TOffer} from '../../types';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import {favoriteActions, favoriteSelectors} from '../../store/slices/favorite';
import {userSelectors} from '../../store/slices/user';

type TOfferCardProps = {
  offer: TOffer;
  handleHover?: (offer?: TOffer) => void;
  isOfferDetail?: boolean;
}

export default function OfferCard({offer, handleHover, isOfferDetail = false}: TOfferCardProps): React.JSX.Element {
  const {pathname} = useLocation() as {pathname: AppRoutes};
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);
  const {changeFavoriteAction} = useActionCreators(favoriteActions);
  const favorites = useAppSelector(favoriteSelectors.selectFavorites);
  let classCard = 'cities';

  let imgWidth = 260;
  let imgHeight = 260;
  if (isOfferDetail) {
    classCard = 'near-places';
  } else if (pathname === AppRoutes.Favorites) {
    classCard = 'favorites';
    imgWidth = 150;
    imgHeight = 110;
  }

  const isFavorite = favorites?.some((item) => item.id === offer.id);

  const handleMouseOn = () => {
    if (handleHover) {
      handleHover(offer);
    }
  };

  const handleMouseOff = () => {
    if (handleHover) {
      handleHover();
    }
  };

  const handlerFavoriteClick = () => {
    if (authorizationStatus === AuthStatus.NoAuth) {
      return navigate(AppRoutes.Login);
    }

    changeFavoriteAction({
      offerId: offer.id,
      status: isFavorite ? 0 : 1,
    });
  };

  return (
    <article
      className={`${classCard}__card place-card`}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${classCard}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoutes.Offer}/${offer.id}`}>
          <img className="place-card__image"
            src={offer.previewImage}
            width={imgWidth}
            height={imgHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button${isFavorite ? ' place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handlerFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}
