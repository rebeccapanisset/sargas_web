import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  password: Yup.string().required(),
  password_confirmation: Yup.string().required(),
});

export default schema;
