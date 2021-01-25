import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import Colors from '~/styles/colors';

import { Container, ComponentButton, Loading } from './styles';

function Button({
  children,
  type,
  bg,
  aligment,
  margin,
  loading,
  isLink,
  ...rest
}) {
  const button = type;
  let bgType;
  if (bg === 'primary') {
    bgType = Colors().primary;
  } else if (bg === 'success') {
    bgType = Colors().success;
  } else if (bg === 'alert') {
    bgType = Colors().alert;
  } else if (bg === 'danger') {
    bgType = Colors().danger;
  } else if (bg === 'info') {
    bgType = Colors().info;
  }

  let align;

  if (aligment === 'left') {
    align = 'flex-start';
  } else if (aligment === 'right') {
    align = 'flex-end';
  } else {
    align = 'center';
  }
  const al = align;

  const definedBg = bgType;

  return (
    <Container aligment={al} margin={margin}>
      {loading ? (
        <Loading bg={definedBg}>
          Carregando <FaSpinner size={12} />
        </Loading>
      ) : (
        <ComponentButton
          type={button}
          {...rest}
          bg={definedBg}
          {...(loading ? 'disabled' : '')}
        >
          {children}
        </ComponentButton>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  bg: PropTypes.string,
  aligment: PropTypes.string,
  margin: PropTypes.string,
  loading: PropTypes.bool,
  isLink: PropTypes.bool,
};

Button.defaultProps = {
  bg: 'primary',
  aligment: 'right',
  margin: '',
  loading: false,
  isLink: false,
};

export default Button;
