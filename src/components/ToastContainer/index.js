import React from 'react';
import { useTransition } from 'react-spring';
import PropTypes from 'prop-types';
import Toast from './Toast';

import { Container } from './styles';

function ToastContainer({ messages }) {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>
  );
}

ToastContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ToastContainer;
