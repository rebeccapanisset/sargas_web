import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.string().required(),
});

export default schema;
