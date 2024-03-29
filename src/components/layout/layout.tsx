import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import {useAppSelector} from '../../store/hooks';
import {AppRoutes} from '../../const';
import {offersSelectors} from '../../store/slices/offers';
import HeaderNav from './header-nav';
import Header from './header';
import Footer from './footer';

export default function Layout(): React.JSX.Element {
  const {pathname} = useLocation() as { pathname: AppRoutes };
  const offers = useAppSelector(offersSelectors.selectOffers);

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
    if (offers && !offers.some((offer) => offer.isFavorite)) {
      pageClassName += ' page--favorites-empty';
    }
    footer = <Footer />;
  }

  return (
    <div className={pageClassName}>
      <Header logoLinkClassName={logoLinkClassName} headerNav={headerNav}/>
      <Outlet />
      {footer}
    </div>
  );
}
