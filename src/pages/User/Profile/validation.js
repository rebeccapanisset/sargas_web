import * as Yup from 'yup';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
    oneOf: 'As senhas não conferem',
  },
});

export const passwordValidation = Yup.object().shape({
  password: Yup.string().required(),
  new_password: Yup.string().when('password', (password, field) =>
    password ? field.required() : field
  ),
  new_password_confirmation: Yup.string().when(
    'new_password',
    (new_password, field) =>
      new_password ? field.required().oneOf([Yup.ref('new_password')]) : field
  ),
});

export const profileValidation = Yup.object().shape({
  username: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().required(),
  access: Yup.string().required(),
});

export const signatureValidation = Yup.object().shape({
  signature: Yup.mixed()
    .test(
      'fileSize',
      'Arquivo muito grande',
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Formato não suportado ( Tente um jpg, png ou gif )',
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .required(),
});
