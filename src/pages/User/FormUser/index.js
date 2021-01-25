import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import ModalDialog from '~/components/ModalDialog';
import { Container } from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Select from '~/components/Select';
import { useUser } from '~/connection/User/index';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

function FormUser({ show, handleClose, selectedUser, update }) {
  const formRef = useRef();
  const { storeUser, updateUser } = useUser();
  const [loading, setLoading] = useState(false);

  const options = [
    {
      value: 'U',
      label: 'Usuário',
    },
    {
      value: 'A',
      label: 'Admin',
    },
  ];

  async function handleForm(data) {
    setLoading(true);
    if (await checkValidation(formRef, data, schema)) {
      const response = update
        ? await updateUser(data, selectedUser.id)
        : await storeUser(data);

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
        selectedItem={selectedUser}
        content={{
          title: update ? 'Editar Usuário' : 'Novo Usuário',
        }}
        handleAction={() => {}}
        isForm
      >
        <Form ref={formRef} initialData={selectedUser} onSubmit={handleForm}>
          <Input type="text" name="name" placeholder="Nome" label="Nome" />
          <Input
            type="text"
            name="username"
            placeholder="Login"
            label="Nome de usuário"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            label="E-mail para recuperação de senha"
          />
          <Select
            name="access"
            placeholder="Selecionar Acesso"
            options={options}
            label="Selecione tipo de Acesso"
          />
          <Button type="submit" loading={loading} margin="10px 0 0">
            {update ? 'Editar' : 'Salvar'}
          </Button>
        </Form>
      </ModalDialog>
    </Container>
  );
}

FormUser.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  update: PropTypes.bool,
};

FormUser.defaultProps = {
  update: false,
};

export default FormUser;
