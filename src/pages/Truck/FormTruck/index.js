import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import ModalDialog from '~/components/ModalDialog';
import { Container, FormContainer } from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useTruck } from '~/connection/Truck';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

function FormTruck({ show, handleClose, selectedTruck, update }) {
  const formRef = useRef();
  const { storeTruck, updateTruck } = useTruck();
  const [loading, setLoading] = useState(false);

  async function handleForm(data) {
    setLoading(true);
    if (await checkValidation(formRef, data, schema)) {
      const response = update
        ? await updateTruck(data, selectedTruck.id)
        : await storeTruck(data);

      if (response) {
        setLoading(false);
        handleClose(true);
      }
    }
    setLoading(false);
  }

  return (
    <Container>
      <ModalDialog
        show={show}
        onHide={handleClose}
        selectedItem={selectedTruck}
        content={{
          title: update ? 'Editar Caminhão' : 'Novo Caminhão',
        }}
        handleAction={() => {}}
        isForm
        size="lg"
      >
        <Form ref={formRef} initialData={selectedTruck} onSubmit={handleForm}>
          <FormContainer>
            <div>
              <Input
                type="text"
                name="plate"
                placeholder="Placa"
                label="Placa do caminhão"
              />
            </div>
            <div>
              <Input
                type="text"
                name="brand"
                placeholder="Marca"
                label="Marca do caminhão"
              />
            </div>
            <div>
              <Input
                type="text"
                name="manufacture_year"
                placeholder="Ano de Fabricação"
                label="Ano de Fabricação"
              />
            </div>
            <div>
              <Input
                type="text"
                name="model"
                placeholder="Modelo"
                label="Modelo do caminhão"
              />
            </div>
            <div>
              <Input
                type="text"
                name="color"
                placeholder="Cor"
                label="Cor do caminhão"
              />
            </div>
            <div>
              <Input
                type="text"
                name="chassi"
                placeholder="Chassi"
                label="Chassi do caminhão"
              />
            </div>
            <div>
              <Input
                type="text"
                name="axes_number"
                placeholder="Quantidade de eixos"
                label="Quantidade de eixos"
              />
            </div>
            <div>
              <Input
                type="text"
                name="between_axes"
                placeholder="Disntância entre eixos"
                label="Disntância entre eixos"
              />
            </div>
          </FormContainer>
          <Button type="submit" loading={loading} margin="10px 0 0">
            {update ? 'Editar' : 'Salvar'}
          </Button>
        </Form>
      </ModalDialog>
    </Container>
  );
}

FormTruck.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedTruck: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  update: PropTypes.bool,
};

FormTruck.defaultProps = {
  update: false,
};

export default FormTruck;
