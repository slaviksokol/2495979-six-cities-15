import React from 'react';
import {Link} from 'react-router-dom';

type errorParamsType = {
  type: string;
}

const ERROR_TYPES: {
  [key: string]: string;
} = {
  offer: 'Offer with the specified ID was not found',
  default: 'You have visited a non-existent page',
};

export default function ErrorPage({type}: errorParamsType): React.JSX.Element {
  let message = ERROR_TYPES.default;

  if (type && ERROR_TYPES[type]) {
    message = ERROR_TYPES[type];
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{color: 'red'}}>There is nothing here!</h1>
      <p>
        {message}
      </p>
      <Link to='/' style={{fontWeight: 'bold', textDecoration: 'underline'}}>To main 🏠</Link>
    </div>
  );
}
