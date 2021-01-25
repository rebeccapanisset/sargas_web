import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function ErrorMessage({ children, title }) {
  return (
    <Container>
      <span>{title}</span>
      {children}
    </Container>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ErrorMessage.defaultProps = {
  children: '',
};
