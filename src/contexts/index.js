import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { AutoCompleteProvider } from './autocomplete';

function AppProvider({ children }) {
  return (
    <ToastProvider>
      <AutoCompleteProvider>
        <AuthProvider>{children}</AuthProvider>
      </AutoCompleteProvider>
    </ToastProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppProvider;
