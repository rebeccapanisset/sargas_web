import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import ModalDialog from '~/components/ModalDialog';
import { Container } from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useAerial } from '~/connection/Products/Aerial';
import { useFile } from '~/connection/File';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';
import FileInput from '~/components/FileInput';
import CurrencyInput from '~/components/Input/CurrencyInput';

function FormAerial({ show, handleClose, selectedItem, update }) {
  const formRef = useRef();
  const { storeAerial, updateAerial } = useAerial();
  const { storeFile } = useFile();
  const [loading, setLoading] = useState(false);

  async function handleForm(data) {
    const { numAsString } = formRef.current.getFieldRef('price').state;

    setLoading(true);
    data = { ...data, price: numAsString, datatype: 'aerial_tank' };
    if (await checkValidation(formRef, data, schema)) {
      const file = await storeFile(data.image, 'aerial');

      const formData = { ...data, image_id: file.id };

      const response = update
        ? await updateAerial(formData, selectedItem.product_id)
        : await storeAerial(formData);

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
          <Input
            type="text"
            name="length"
            placeholder="Comprimento"
            label="Comprimento"
          />
          <Input
            type="text"
            name="diameter"
            placeholder="Diâmetro"
            label="Diâmetro"
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

FormAerial.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    product_id: PropTypes.number,
  }).isRequired,
  update: PropTypes.bool,
};

FormAerial.defaultProps = {
  update: false,
};

export default FormAerial;
