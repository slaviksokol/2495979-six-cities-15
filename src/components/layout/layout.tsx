import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {AppRoutes} from '../../const';
import HeaderNav from './header-nav';

const getLayoutState = (pathname: AppRoutes) => {
  let pageClassName: string = 'page';
  let logoLinkClassName: string = 'header__logo-link';
  let headerNav: React.JSX.Element | null = <HeaderNav />;

  if (pathname === AppRoutes.Main) {
    pageClassName += ' page--gray page--main';
    logoLinkClassName += ' header__logo-link--active';
  } else if (pathname === AppRoutes.Login) {
    pageClassName += ' page--gray page--login';
    headerNav = null;
  }

  return {pageClassName, logoLinkClassName, headerNav};
};

export default function Layout(): React.JSX.Element {
  const {pathname} = useLocation();
  const {pageClassName, logoLinkClassName, headerNav} = getLayoutState(pathname as AppRoutes);

  return (
    <div className={pageClassName}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className={logoLinkClassName} to={AppRoutes.Main}>
                <img className="header__logo" src="../../markup/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            {headerNav}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
