import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FaKey } from 'react-icons/fa';
import { Form } from '@unform/web';
import queryString from 'querystring';
import { useHistory } from 'react-router-dom';
import Input from '~/components/Input';
import { useAccess } from '~/connection/Access/recovery-password';

import { Container, FormContainer, Image } from '~/pages/_layout/auth/styles';
import Colors from '~/styles/colors';
import Logo from '~/assets/logo.png';

import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

export default function ResetPassword({ location }) {
  const formRef = useRef(null);
  const history = useHistory();
  const { resetPassword } = useAccess();

  const parsedParam = queryString.parse(location.search.replace('?', ''));

  async function handleSubmit(data) {
    if (await checkValidation(formRef, data, schema)) {
      const repsonse = await resetPassword(data, formRef, parsedParam.token);
      if (repsonse) {
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
                type="password"
                name="password"
                placeholder="Nova Senha"
                icon={<FaKey size={12} color={Colors.green} />}
              />
            </div>
            <div>
              <Input
                type="password"
                name="password_confirmation"
                placeholder="Confirme nova senha"
                icon={<FaKey size={12} color={Colors.green} />}
              />
            </div>
          </div>
          <button type="submit">Enviar</button>
        </Form>
      </FormContainer>
    </Container>
  );
}

ResetPassword.propTypes = {
  location: PropTypes.objectOf(PropTypes.node),
};

ResetPassword.defaultProps = {
  location: '',
};
