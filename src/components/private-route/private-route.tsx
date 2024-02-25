import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoutes, AuthStatus} from '../../const';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: React.JSX.Element;
}

function PrivateRoute({authStatus, children}: PrivateRouteProps) {
  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}

export default PrivateRoute;
