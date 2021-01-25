import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  username: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().required(),
  access: Yup.string().required(),
});

export default schema;
