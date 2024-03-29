import React from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoutes, AuthStatus} from '../../const';
import {useAppSelector} from '../../store/hooks';
import {userSelectors} from '../../store/slices/user';

type PrivateRouteProps = {
  children: React.JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);

  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}

export default PrivateRoute;
