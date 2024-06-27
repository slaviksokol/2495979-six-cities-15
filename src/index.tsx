import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {GlobalStyle, theme} from './index.style.ts';
import {ThemeProvider} from 'styled-components';

import {store} from './store';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store} stabilityCheck="never">
        <ThemeProvider theme={theme.dark}>
          <GlobalStyle/>
          <ToastContainer />
          <App />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
