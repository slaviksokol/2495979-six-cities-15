import React, {FormEvent, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {useActionCreators, useAppSelector} from '../../store/hooks';
import {userActions, userSelectors} from '../../store/slices/user';
import {AppRoutes, AuthStatus} from '../../const';
import {offersActions, offersSelectors} from '../../store/slices/offers';
import {getCitiesFromOffers, getRandomCity} from '../../utils/func';

function Login(): React.JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const {loginAction} = useActionCreators(userActions);
  const navigate = useNavigate();
  const offers = useAppSelector(offersSelectors.selectOffers);
  const {changeCity} = useActionCreators(offersActions);
  const cities = getCitiesFromOffers(offers);
  const city = getRandomCity(cities);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      if ('value' in emailRef.current && 'value' in passwordRef.current) {
        loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      }

      if (authorizationStatus === AuthStatus.Auth) {
        navigate(AppRoutes.Main);
      }
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      navigate(AppRoutes.Main);
    }
  }, [authorizationStatus, navigate]);

  const handlerClick = () => {
    changeCity(city);
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={emailRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoutes.Main}
              onClick={handlerClick}
            >
              <span>{city ? city.name : 'Main'}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
