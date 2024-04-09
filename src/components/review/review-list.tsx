import React from 'react';

import ReviewItem from './review-item';
import {useAppSelector} from '../../store/hooks';
import {commentsSelectors} from '../../store/slices/comments';
import {getSortedComments} from '../../utils/func.ts';
import {MAX_COMMENTS} from '../../const.ts';

export default function ReviewList(): React.JSX.Element {
  let comments = useAppSelector(commentsSelectors.selectComments);

  if (comments.length) {
    comments = getSortedComments(comments).slice(0, MAX_COMMENTS);
  }

  return (
    <ul className="reviews__list">
      {
        comments.map((review) => <ReviewItem key={review.id} review={review} />)
      }
    </ul>
  );
}
