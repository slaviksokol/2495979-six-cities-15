import React, {FormEvent, ReactEventHandler, useState} from 'react';

import InputRadio from '../ui/input-radio';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import {commentsActions} from '../../store/slices/comments';
import {offerDetailSelectors} from '../../store/slices/offer-detail';

type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const rating = [
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

  const minTextLength: number = 50;

  const {postCommentAction} = useActionCreators(commentsActions);
  const curOffer = useAppSelector(offerDetailSelectors.selectOffer);

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
      setReview({rating: 0, review: ''});
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          rating.map(({value, label}) => (
            <InputRadio
              key={value}
              value={value}
              label={label}
              handleChange={handleChange}
              checked={Number(review.rating) === value}
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
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{minTextLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.rating === 0 || review.review.length < minTextLength}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
