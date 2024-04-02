import React from 'react';
import {Link} from 'react-router-dom';

import {AppRoutes, AuthStatus} from '../../const';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import {userActions, userSelectors} from '../../store/slices/user';
import {favoriteSelectors} from '../../store/slices/favorite';

export default function HeaderNav(): React.JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);
  const userData = useAppSelector(userSelectors.selectUserData);
  const {logoutAction} = useActionCreators(userActions);

  const favorites = useAppSelector(favoriteSelectors.selectFavorites);
  const handleSignOutClick = () => {
    if (authorizationStatus === AuthStatus.Auth) {
      logoutAction();
    }
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          authorizationStatus === AuthStatus.Auth &&
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userData ? userData.email : ''}</span>
                <span className="header__favorite-count">{favorites ? favorites.length : 0}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={AppRoutes.Main}>
                <span className="header__signout" onClick={handleSignOutClick}>Sign out</span>
              </Link>
            </li>
          </>
        }
        {
          authorizationStatus !== AuthStatus.Auth &&
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        }
      </ul>
    </nav>
  );
}
