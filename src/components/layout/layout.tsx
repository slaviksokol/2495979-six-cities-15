import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {AppRoutes} from '../../const';
import HeaderNav from './header-nav';
import Header from './header';
import Footer from './footer';

const getLayoutState = (pathname: AppRoutes) => {
  let pageClassName: string = 'page';
  let logoLinkClassName: string = 'header__logo-link';
  let headerNav: React.JSX.Element | null = <HeaderNav />;
  let footer: React.JSX.Element | null = null;

  if (pathname === AppRoutes.Main) {
    pageClassName += ' page--gray page--main';
    logoLinkClassName += ' header__logo-link--active';
  } else if (pathname === AppRoutes.Login) {
    pageClassName += ' page--gray page--login';
    headerNav = null;
  } else if (pathname === AppRoutes.Favorites) {
    footer = <Footer />;
  }

  return {pageClassName, logoLinkClassName, headerNav, footer};
};

export default function Layout(): React.JSX.Element {
  const {pathname} = useLocation();
  const {pageClassName, logoLinkClassName, headerNav, footer} = getLayoutState(pathname as AppRoutes);

  return (
    <div className={pageClassName}>
      <Header logoLinkClassName={logoLinkClassName} headerNav={headerNav}/>
      <Outlet />
      {footer}
    </div>
  );
}
