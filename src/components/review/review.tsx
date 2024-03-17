import React from 'react';
import ReviewList from './review-list';
import ReviewForm from './review-form';
import {AuthStatus} from '../../const';
import {TReview} from '../../types';

type TReviews = {
  authStatus: AuthStatus;
  reviews: TReview[];
}

export default function Reviews({authStatus, reviews}: TReviews): React.JSX.Element {
  return (
    <>
      <ReviewList reviews={reviews} />
      {authStatus && <ReviewForm />}
      {!authStatus && <p>Только авторизованные пользователи могут оставлять комментарии</p>}
    </>
  );
}
