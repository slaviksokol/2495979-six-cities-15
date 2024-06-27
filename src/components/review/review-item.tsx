import React from 'react';

import {TComment} from '../../types';
import {getRatingWidth} from '../../utils/func';
import {ItemLiYellow} from './review.style';

export default function ReviewItem({review}: { review: TComment }): React.JSX.Element {
  const date = new Date(review.date);
  const month = date.toLocaleString('en', {month: 'long'});
  const year = date.getFullYear();

  return (
    <ItemLiYellow className="reviews__item" primary='true' bordercolor={'yellow'}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingWidth(review.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{`${month} ${year}`}</time>
      </div>
    </ItemLiYellow>
  );
}
