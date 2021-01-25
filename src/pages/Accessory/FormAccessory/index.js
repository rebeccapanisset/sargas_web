import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';

import ModalDialog from '~/components/ModalDialog';
import { Container } from './styles';
import CurrencyInput from '~/components/Input/CurrencyInput';
import CheckboxInput from '~/components/CheckboxInput';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useAccessories } from '~/connection/Accessories';
import { useTankTypes } from '~/connection/TankTypes';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

function FormAccessory({ show, handleClose, selectedAccessory, update }) {
  const formRef = useRef();
  const { storeAccessories, updateAccessories } = useAccessories();
  const { getTankTypes } = useTankTypes();
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);

  async function handleForm(data) {
    const { numAsString } = formRef.current.getFieldRef('price').state;

    setLoading(true);
    data = { ...data, price: numAsString };

    if (await checkValidation(formRef, data, schema)) {
      const response = update
        ? await updateAccessories(data, selectedAccessory.id)
        : await storeAccessories(data);

      if (response) {
        setLoading(false);
        handleClose(true);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    async function loadTankTypes() {
      const response = await getTankTypes();

      setTypes(
        response.map((type) => {
          return {
            id: type.id,
            value: type.id,
            label: type.name,
          };
        })
      );

      if (update) {
        const options = selectedAccessory.types.map((option) =>
          String(option.id)
        );

        await formRef.current.setFieldValue('types', options);
      }
    }

    loadTankTypes();
  }, []);

  return (
    <Container>
      <ModalDialog
        show={show}
        onHide={handleClose}
        selectedItem={selectedAccessory}
        content={{
          title: update ? 'Editar Acessório' : 'Novo Acessório',
        }}
        handleAction={() => {}}
        isForm
      >
        <Form
          ref={formRef}
          initialData={selectedAccessory}
          onSubmit={handleForm}
        >
          <Input type="text" name="name" placeholder="Nome" label="Nome" />
          <CurrencyInput
            type="text"
            name="price"
            placeholder="Preço"
            label="Preço"
          />
          <CheckboxInput name="types" options={types} label="Tipo de Tanque" />
          <Button type="submit" loading={loading} margin="10px 0 0">
            {update ? 'Editar' : 'Salvar'}
          </Button>
        </Form>
      </ModalDialog>
    </Container>
  );
}

FormAccessory.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedAccessory: PropTypes.shape({
    id: PropTypes.number,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
  }).isRequired,
  update: PropTypes.bool,
};

FormAccessory.defaultProps = {
  update: false,
};

export default FormAccessory;
