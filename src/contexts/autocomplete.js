import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AutoCompleteContext = createContext({});

export function AutoCompleteProvider({ children }) {
  const [accessories] = useState(new Map());

  function handleSetAccessories(selectedAccessories) {
    accessories.set('Accessories', selectedAccessories);
  }

  return (
    <AutoCompleteContext.Provider value={{ accessories, handleSetAccessories }}>
      {children}
    </AutoCompleteContext.Provider>
  );
}

export function useAutoComplete() {
  const context = useContext(AutoCompleteContext);
  return context;
}

AutoCompleteProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

AutoCompleteProvider.defaultProps = {
  children: '',
};
