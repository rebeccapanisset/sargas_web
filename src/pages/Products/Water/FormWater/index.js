import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import ModalDialog from '~/components/ModalDialog';
import { Container } from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useFile } from '~/connection/File';
import { useWater } from '~/connection/Products/Water';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';
import FileInput from '~/components/FileInput';
import CurrencyInput from '~/components/Input/CurrencyInput';

function FormWater({ show, handleClose, selectedItem, update }) {
  const formRef = useRef();
  const { storeWater, updateWater } = useWater();
  const { storeFile } = useFile();
  const [loading, setLoading] = useState(false);

  async function handleForm(data) {
    const { numAsString } = formRef.current.getFieldRef('price').state;

    setLoading(true);
    data = { ...data, price: numAsString, datatype: 'water_tank' };
    if (await checkValidation(formRef, data, schema)) {
      const file = await storeFile(data.image, 'water');

      const formData = { ...data, image_id: file.id };

      const response = update
        ? await updateWater(formData, selectedItem.product_id)
        : await storeWater(formData);

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
        selectedItem={selectedItem}
        content={{
          title: update ? 'Editar Tanque' : 'Novo Tanque',
        }}
        handleAction={() => {}}
        isForm
      >
        <Form ref={formRef} initialData={selectedItem} onSubmit={handleForm}>
          <Input
            type="text"
            name="description"
            placeholder="Descrição"
            label="Descrição"
          />
          <CurrencyInput
            type="text"
            name="price"
            placeholder="Preço"
            label="Preço"
          />
          <Input
            type="text"
            name="volume"
            placeholder="Volume"
            label="Volume"
          />
          <FileInput name="image" label="Imagem do Tanque" />
          <Button type="submit" loading={loading} margin="10px 0 0">
            {update ? 'Editar' : 'Salvar'}
          </Button>
        </Form>
      </ModalDialog>
    </Container>
  );
}

FormWater.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    product_id: PropTypes.number,
  }).isRequired,
  update: PropTypes.bool,
};

FormWater.defaultProps = {
  update: false,
};

export default FormWater;
