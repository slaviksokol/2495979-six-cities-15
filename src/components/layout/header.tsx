import React from 'react';
import {Link} from 'react-router-dom';

import {AppRoutes} from '../../const';

type THeaderParams = {
  logoLinkClassName: string;
  headerNav: React.JSX.Element | null;
}

export default function Header({logoLinkClassName, headerNav}: THeaderParams): React.JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={logoLinkClassName} to={AppRoutes.Main}>
              <img className="header__logo" src="../../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {headerNav}
        </div>
      </div>
    </header>
  );
}
