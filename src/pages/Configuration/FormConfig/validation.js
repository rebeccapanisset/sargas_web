import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  expiration: Yup.string().required(),
  discontinuance: Yup.string().required(),
  payment_methods: Yup.string().required(),
  sale_types: Yup.string().required(),
});

export default schema;
