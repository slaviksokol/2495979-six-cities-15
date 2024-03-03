import React from 'react';
import {Link} from 'react-router-dom';

type errorParamsType = {
  type: string;
}

const errorTypes: {
  [key: string]: string;
} = {
  offer: 'Предложение с указанным ID не найдено',
  default: 'Вы зашли на несуществующую страницу',
};

function Error404({type}: errorParamsType): React.JSX.Element {
  let message = errorTypes.default;

  if (type && errorTypes[type]) {
    message = errorTypes[type];
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{color: 'red'}}>Здесь ничего нет!</h1>
      <p>
        {message}
      </p>
      <Link to='/' style={{fontWeight: 'bold', textDecoration: 'underline'}}>На главную 🏠</Link>
    </div>
  );
}

export default Error404;
