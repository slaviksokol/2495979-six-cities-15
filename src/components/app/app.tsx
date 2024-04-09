import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';

import {AppRoutes, AuthStatus} from '../../const';
import {useActionCreators, useAppSelector} from '../../store/hooks';
import Main from '../../pages/main/main';
import ErrorPage from '../../pages/error-page/error-page';
import Login from '../../pages/login/login';
import OfferDetail from '../../pages/offers/offer-detail';
import Favorites from '../../pages/favorites/favorites';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import {offersActions} from '../../store/slices/offers';
import {userActions, userSelectors} from '../../store/slices/user';
import {getToken} from '../../services/token';
import {favoriteActions} from '../../store/slices/favorite';

export function App() {
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);
  const {checkAuthAction, setAuthorization} = useActionCreators(userActions);
  const {fetchFavoriteAction} = useActionCreators(favoriteActions);
  const {resetFavorites} = useActionCreators(favoriteActions);
  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuthAction();
    } else {
      setAuthorization(AuthStatus.NoAuth);
    }
  }, [checkAuthAction, setAuthorization, authorizationStatus, token]);

  const {fetchOffersAction} = useActionCreators(offersActions);
  useEffect(() => {
    fetchOffersAction();
    if (authorizationStatus === AuthStatus.Auth) {
      fetchFavoriteAction();
    } else {
      resetFavorites();
    }
  }, [authorizationStatus, fetchFavoriteAction, fetchOffersAction, resetFavorites]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout />}>
          <Route index element={<Main />}/>
          <Route path={AppRoutes.Login} element={<Login />}/>
          <Route
            path={AppRoutes.Favorites}
            element={(
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            )}
          />
          <Route path={AppRoutes.OfferId} element={<OfferDetail />}/>
          <Route path={AppRoutes.Error404} element={<ErrorPage type='default'/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
