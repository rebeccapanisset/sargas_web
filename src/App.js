import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '~/styles/global';
import history from '~/services/history';
import AppProvider from '~/contexts';
import Routes from '~/routes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
      <AppProvider>
        <Routes />
        <GlobalStyles />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
