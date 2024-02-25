import React from 'react';
import {Link} from 'react-router-dom';

function Error404(): React.JSX.Element {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{color: 'red'}}>Здесь ничего нет!</h1>
      <p>
        Вы зашли на несуществующую страницу
      </p>
      <Link to='/' style={{fontWeight: 'bold', textDecoration: 'underline'}}>На главную 🏠</Link>
    </div>
  );
}

export default Error404;
