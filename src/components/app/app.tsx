import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';

import {AppRoutes, AuthStatus} from '../../const';
import {useAppSelector, useActionCreators} from '../../store/hooks';
import Main from '../../pages/main/main';
import Error404 from '../../pages/Error404';
import Login from '../../pages/login/login';
import OfferDetail from '../../pages/offers/offer-detail';
import Favorites from '../../pages/favorites/favorites';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import {offersActions, offersSelectors} from '../../store/slices/offers';
import {userActions} from '../../store/slices/user';
import {getToken} from '../../services/token';

export function App() {
  const {checkAuthAction, setAuthorization} = useActionCreators(userActions);
  useEffect(() => {
    if (getToken()) {
      checkAuthAction();
    } else {
      setAuthorization(AuthStatus.NoAuth);
    }
  }, [checkAuthAction, setAuthorization]);

  const {fetchOffersAction} = useActionCreators(offersActions);
  useEffect(() => {
    fetchOffersAction();
  }, [fetchOffersAction]);

  const offers = useAppSelector(offersSelectors.selectOffers);

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
                <Favorites offers={offers.filter((offer) => offer.isFavorite)} />
              </PrivateRoute>
            )}
          />
          <Route path={AppRoutes.OfferId} element={<OfferDetail />}/>
          <Route path={AppRoutes.Error404} element={<Error404 type='default'/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
