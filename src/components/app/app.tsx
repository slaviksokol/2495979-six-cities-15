import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoutes, AuthStatus} from '../../const';
import Main from '../../pages/main/main';
import Error404 from '../../pages/Error404';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';

type Offers = {
  count: number;
};

export function App({count}: Offers) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout />}>
          <Route index element={<Main count={count} />}/>
          <Route path={AppRoutes.Login} element={<Login />}/>
          <Route
            path={AppRoutes.Favorites}
            element={(
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <Favorites />
              </PrivateRoute>
            )}
          />
          <Route path={AppRoutes.Offer} element={<Offer />}/>
          <Route path={AppRoutes.Error404} element={<Error404 />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
