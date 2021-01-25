import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '~/contexts/auth';

import DefaultLayout from '~/pages/_layout/default';
import AuthLayout from '~/pages/_layout/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isAdmin,
  ...rest
}) {
  const sotarageToken = localStorage.getItem('@SGAuth:token');
  const { user } = useAuth();

  if (!sotarageToken && isPrivate) return <Redirect to="/" />;

  if (sotarageToken && !isPrivate) return <Redirect to="/dashboard" />;

  if (sotarageToken && user.access !== 'A' && isAdmin) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = sotarageToken ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
