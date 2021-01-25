import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { useAuth } from '~/contexts/auth';
import Input from '~/components/Input';
import FileInput from '~/components/FileInput';
import Button from '~/components/Button';
import { Container, BoxContent, HeaderContent, Content, SetedSignature } from './styles';
import { useFile } from '~/connection/File';
import { useUser } from '~/connection/User/index';
import { checkValidation } from '~/libs/checkSchemaValidation';
import defaultImage from '~/assets/default-image.png'
import {
  profileValidation,
  passwordValidation,
  signatureValidation
} from '~/pages/User/Profile/validation';

function Profile() {
  const { user, profile } = useAuth();
  const { updateUser, getUser, updatePassword } = useUser();
  const { storeFile } = useFile();
  const editRef = useRef();
  const passwordRef = useRef();

  const [signedUser, setSignedUser] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    async function loadUser(id) {
      const response = await getUser(id);
      editRef.current.setData(response);
      editRef.current.setFieldValue('signature', '');
      setSignedUser(response);
    }
    loadUser(user.id);
  }, [setSignedUser]);

  async function handleUser(data) {
    data = {
      ...data,
      access: user.access,
    };
    setEditLoading(true);
    if (await checkValidation(editRef, data, profileValidation)) {
      let formData = {}
      if(data.signature){
        if (await checkValidation(editRef, data, signatureValidation)) {
          const file = await storeFile(data.signature, 'signature');
          formData = { ...data, signature_id: file.id};
        }else{
          setEditLoading(false);
          return false;
        }
      }else{
        formData = { ...data, signature_id: user.signature?.id };
      }

      
    
      const response = await updateUser(formData, user.id);

      if(response){
        setEditLoading(false);
        setSignedUser(response.data);
        profile(response.data);
      }
      setEditLoading(false);
    } else {
      setEditLoading(false);
    }
  }

  async function handlePassword(data) {
    setPasswordLoading(true);
    if (await checkValidation(passwordRef, data, passwordValidation)) {
      const response = await updatePassword(data);
      setPasswordLoading(false);
    } else {
      setPasswordLoading(false);
    }
  }

  return (
    <Container>
      <BoxContent>
        <Content>
          <div>
            <HeaderContent>
              <nav>
                <ul>
                  <li>Editar Perfil</li>
                </ul>
              </nav>
            </HeaderContent>
            <Form ref={editRef}  onSubmit={handleUser}>
              <Input
                type="text"
                name="username"
                placeholder="Login"
                label="Nome de usuário"
              />
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                label="E-mail"
              />
              <Input type="name" name="name" placeholder="Nome" label="Nome" />
              <FileInput name="signature" label="Assinatura" />
              <Button type="submit" loading={editLoading}>
                Editar
              </Button>
            </Form>
            <SetedSignature>
            <strong>Assinatura Cadastrada</strong>
            <img src={signedUser.signature?.url || defaultImage} width alt="Assinatura cadastrada" />
            </SetedSignature>
          </div>

          <div>
            <HeaderContent>
              <nav>
                <ul>
                  <li>Alterar Senha</li>
                </ul>
              </nav>
            </HeaderContent>
            <Form
              ref={passwordRef}
              initialData={signedUser}
              onSubmit={handlePassword}
            >
              <Input
                type="password"
                name="password"
                placeholder="Senha Atual"
                label="Senha atual"
              />
              <Input
                type="password"
                name="new_password"
                placeholder="Nova senha"
                label="Nova senha"
              />
              <Input
                type="password"
                name="new_password_confirmation"
                placeholder="Confirme a senha"
                label="Confirme a senha"
              />
              <Button type="submit" loading={passwordLoading}>
                Trocar Senha
              </Button>
            </Form>
          </div>
        </Content>
      </BoxContent>
    </Container>
  );
}

export default Profile;
