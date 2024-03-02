import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoutes.Main}>
        <img className="footer__logo" src="../../markup/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  );
}
