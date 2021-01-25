import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Container } from './styles';
import Button from '~/components/Button';

function ModalDialog({
  show,
  size,
  onHide,
  selectedItem,
  content,
  handleAction,
  children,
  isForm,
}) {
  return (
    <Container>
      <Modal show={show} size={size} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{content.title}</Modal.Title>
        </Modal.Header>
        {isForm ? (
          <Modal.Body>{children}</Modal.Body>
        ) : (
          <>
            <Modal.Body>
              {content.body}
              <br />
              <br />
              <strong>{content.value}</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" bg="info" onClick={onHide}>
                Cancelar
              </Button>
              <Button
                type="button"
                bg={content.confirmationBg}
                onClick={() =>
                  handleAction(
                    selectedItem.product_id
                      ? selectedItem.product_id
                      : selectedItem.id
                  )
                }
              >
                {content.confirmation}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

ModalDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  size: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  content: PropTypes.objectOf(PropTypes.string).isRequired,
  handleAction: PropTypes.func.isRequired,
  children: PropTypes.shape(),
  isForm: PropTypes.bool,
};

ModalDialog.defaultProps = {
  isForm: false,
  size: '',
  children: PropTypes.shape(),
};

export default ModalDialog;
