import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoutes, AuthStatus} from '../../const';
import {useAppSelector} from '../../store';
import Main from '../../pages/main/main';
import Error404 from '../../pages/Error404';
import Login from '../../pages/login/login';
import OfferDetail from '../../pages/offers/offer-detail';
import Favorites from '../../pages/favorites/favorites';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import {offersSelectors} from '../../store/reducer';

const isAuth:AuthStatus = AuthStatus.Auth;

export function App() {
  const offers = useAppSelector(offersSelectors.selectOffers) ?? [];

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout />}>
          <Route index element={<Main />}/>
          <Route path={AppRoutes.Login} element={<Login />}/>
          <Route
            path={AppRoutes.Favorites}
            element={(
              <PrivateRoute authStatus={isAuth}>
                <Favorites offers={offers.filter((offer) => offer.isFavorite)} />
              </PrivateRoute>
            )}
          />
          <Route path={AppRoutes.OfferId} element={<OfferDetail offers={offers} authStatus={isAuth} />}/>
          <Route path={AppRoutes.Error404} element={<Error404 type='default'/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
