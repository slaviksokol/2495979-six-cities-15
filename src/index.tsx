import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {generateOffers} from './mocks/offers';
import {TOffer} from './types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offers: TOffer[] = generateOffers(20);

root.render(
  <React.StrictMode>
    <App offers={offers}/>
  </React.StrictMode>
);
