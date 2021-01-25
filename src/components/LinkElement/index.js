import React from 'react';
import PropTypes from 'prop-types';
import Colors from '~/styles/colors';

import { Container, ComponentLink } from './styles';

function LinkElement({ children, bg, aligment, margin, ...rest }) {
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
      <ComponentLink {...rest} bg={definedBg}>
        {children}
      </ComponentLink>
    </Container>
  );
}

LinkElement.propTypes = {
  children: PropTypes.string.isRequired,
  bg: PropTypes.string,
  aligment: PropTypes.string,
  margin: PropTypes.string,
};

LinkElement.defaultProps = {
  bg: 'primary',
  aligment: 'right',
  margin: '',
};

export default LinkElement;
