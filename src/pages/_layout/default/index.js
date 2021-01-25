import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

import routes from '~/routes/routes';

import { Container, MainPainel, Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  const { pathname } = useLocation();
  const [pageName, setPageName] = useState('Dashboard');

  useEffect(() => {
    for (let i = 0; i < routes.length; i++) {
      if (pathname === routes[i].path) {
        setPageName(routes[i].name);
      }
    }
  }, [pathname]);

  return (
    <Container>
      <Sidebar />
      <MainPainel>
        <Header title={pageName} />
        <Wrapper>{children}</Wrapper>
        <Footer />
      </MainPainel>
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
