import React, { useRef } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import Input from '~/components/Input';

import { Container, FormContainer, Image } from '~/pages/_layout/auth/styles';
import Colors from '~/styles/colors';
import Logo from '~/assets/logo.png';

import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';

import { useAuth } from '~/contexts/auth';

export default function Login() {
  const formRef = useRef(null);
  const { signIn } = useAuth();
  const history = useHistory();

  async function handleSubmit(data) {
    if (await checkValidation(formRef, data, schema)) {
      if (await signIn(data, formRef)) {
        history.push('/dashboard');
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
            <h2>Login</h2>
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Login"
                icon={<FaUser size={12} color={Colors.green} />}
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                icon={<FaKey size={12} color={Colors.green} />}
              />
            </div>
            <Link to="/solicitar-recuperacao">Recuperar Senha</Link>
          </div>
          <button type="submit">Entrar</button>
        </Form>
      </FormContainer>
    </Container>
  );
}
