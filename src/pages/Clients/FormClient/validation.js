import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  name: Yup.string().required(),
  cpf_cnpj: Yup.string().required(),
  ie: Yup.string(),
  email: Yup.string().required(),
  phones: Yup.string().required(),
  zip_code: Yup.string().required(),
  address: Yup.string().required(),
  neighborhood: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
});

export default schema;
