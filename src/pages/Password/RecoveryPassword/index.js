import React, { useRef } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import Input from '~/components/Input';
import { useAccess } from '~/connection/Access/recovery-password';

import { Container, FormContainer, Image } from '~/pages/_layout/auth/styles';
import Colors from '~/styles/colors';
import Logo from '~/assets/logo.png';

import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

export default function RecoveryPassword() {
  const formRef = useRef(null);
  const history = useHistory();
  const { getRecoveryToken } = useAccess();

  async function handleSubmit(data) {
    if (await checkValidation(formRef, data, schema)) {
      const response = await getRecoveryToken(data, formRef);
      if (response) {
        history.push('/');
      }
    }
    return '';
  }

  return (
    <Container>
      <FormContainer>
        <Image>
          <div>
            <img src={Logo} alt="" />
          </div>
        </Image>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <h2>Recuperar senha</h2>
            <div>
              <Input
                type="text"
                name="email"
                placeholder="E-mail"
                icon={<FaEnvelope size={12} color={Colors.green} />}
              />
            </div>
            <Link to="/">Lembrei a senha</Link>
          </div>
          <button type="submit">Enviar</button>
        </Form>
      </FormContainer>
    </Container>
  );
}
