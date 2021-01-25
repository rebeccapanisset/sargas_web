import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export default schema;
