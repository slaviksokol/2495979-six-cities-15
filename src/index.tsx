import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';

import {store} from './store';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store} stabilityCheck="never">
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
