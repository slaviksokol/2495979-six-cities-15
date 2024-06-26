import React, {Fragment, ReactEventHandler} from 'react';

type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

type TInputRadio = {
  value: number;
  label: string;
  handleChange: TChangeHandler;
  checked: boolean;
  disabled: boolean;
}

export default function InputRadio({value, label, handleChange, checked, disabled}: TInputRadio): React.JSX.Element {
  return (
    <Fragment key={value}>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={handleChange}
        checked={checked}
        disabled={disabled}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={label}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  );
}
