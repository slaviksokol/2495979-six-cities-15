import React, {FormEvent, ReactEventHandler, useEffect, useState} from 'react';

import InputRadio from '../ui/input-radio';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import {commentsActions, commentsSelectors} from '../../store/slices/comments';
import {offerDetailSelectors} from '../../store/slices/offer-detail';
import {MAX_TEXT_COMMENT_LENGTH, MIN_TEXT_COMMENT_LENGTH, StatusLoading} from '../../const';

type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const ratingArray = [
  {value: 5, label: 'perfect'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terribly'},
];

export default function ReviewForm(): React.JSX.Element {
  const [review, setReview] = useState({rating: 0, review: ''});

  const handleChange: TChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    setReview({...review, [name]: value});
  };

  const {postCommentAction} = useActionCreators(commentsActions);
  const curOffer = useAppSelector(offerDetailSelectors.selectOffer);
  const statusAddingComment = useAppSelector(commentsSelectors.selectStatusAddingComment);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (curOffer) {
      postCommentAction({
        offerId: curOffer.id,
        commentData: {
          comment: review.review,
          rating: Number(review.rating),
        }
      });
    }
  };

  useEffect(() => {
    if (statusAddingComment === StatusLoading.Success) {
      setReview({rating: 0, review: ''});
    }
  }, [statusAddingComment]);

  const isDisabledButton = review.rating === 0
    || review.review.length < MIN_TEXT_COMMENT_LENGTH
    || review.review.length > MAX_TEXT_COMMENT_LENGTH
    || statusAddingComment === StatusLoading.Loading;

  const isDisabledForm = statusAddingComment === StatusLoading.Loading;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratingArray.map(({value, label}) => (
            <InputRadio
              key={value}
              value={value}
              label={label}
              handleChange={handleChange}
              checked={Number(review.rating) === value}
              disabled={isDisabledForm}
            />
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        value={review.review}
        disabled={isDisabledForm}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_TEXT_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
