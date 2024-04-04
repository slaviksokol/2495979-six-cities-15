import React from 'react';

import ReviewItem from './review-item';
import {useAppSelector} from '../../store/hooks';
import {commentsSelectors} from '../../store/slices/comments';
import {getSortedComments} from '../../utils/func';
import {MAX_COMMENTS} from '../../const';

export default function ReviewList(): React.JSX.Element {
  let comments = useAppSelector(commentsSelectors.selectComments);
  comments = getSortedComments(comments).slice(0, MAX_COMMENTS);

  return (
    <ul className="reviews__list">
      {
        comments.map((review) => <ReviewItem key={review.id} review={review} />)
      }
    </ul>
  );
}
