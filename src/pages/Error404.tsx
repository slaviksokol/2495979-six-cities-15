import React from 'react';
import {Link} from 'react-router-dom';

type errorParamsType = {
  type: string;
}

const errorTypes: {
  [key: string]: string;
} = {
  offer: 'Offer with the specified ID was not found',
  default: 'You have visited a non-existent page',
};

function Error404({type}: errorParamsType): React.JSX.Element {
  let message = errorTypes.default;

  if (type && errorTypes[type]) {
    message = errorTypes[type];
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

export default Error404;
