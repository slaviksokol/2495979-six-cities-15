import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offers = {
  count: 6,
};

root.render(
  <React.StrictMode>
    <App count={offers.count}/>
  </React.StrictMode>
);
