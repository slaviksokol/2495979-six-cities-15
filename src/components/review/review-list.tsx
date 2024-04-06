import React from 'react';

import ReviewItem from './review-item';
import {useAppSelector} from '../../store/hooks';
import {commentsSelectors} from '../../store/slices/comments';

export default function ReviewList(): React.JSX.Element {
  const comments = useAppSelector(commentsSelectors.selectComments);

  return (
    <ul className="reviews__list">
      {
        comments.map((review) => <ReviewItem key={review.id} review={review} />)
      }
    </ul>
  );
}
