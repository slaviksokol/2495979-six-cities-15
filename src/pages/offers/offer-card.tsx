import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {TOffer} from '../../types';
import {AppRoutes} from '../../const';
import {getRatingWidth} from '../../utils/func';

type TOfferCardProps = {
  offer: TOffer;
  handleHover?: (offer?: TOffer) => void;
}

export default function OfferCard({offer, handleHover}: TOfferCardProps): React.JSX.Element {
  const {pathname} = useLocation() as {pathname: AppRoutes};
  let classCard = 'cities';

  if (pathname === AppRoutes.OfferId) {
    classCard = 'near-places';
  } else if (pathname === AppRoutes.Favorites) {
    classCard = 'favorites';
  }

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

  return (
    <article
      className={`${classCard}__card place-card`}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
    >
      <div className={`${classCard}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoutes.Offer}/${offer.id}`}>
          <img className="place-card__image"
            src={offer.images[0]}
            width="260"
            height="200"
            style={{width: 260,height: 200}}
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
            className={`place-card__bookmark-button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''} button`}
            type="button"
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
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
