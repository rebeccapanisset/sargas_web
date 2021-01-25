import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useToast } from '~/contexts/toast';
import { Container } from './styles';

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
};

function Toast({ toast, style }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, removeToast]);

  return (
    <Container type={toast.type} style={style}>
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        <p>{toast.description}</p>
      </div>
      <button type="button" onClick={() => removeToast(toast.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

Toast.propTypes = {
  toast: PropTypes.arrayOf([PropTypes.string]).isRequired,
  style: PropTypes.element.isRequired,
};

export default Toast;
