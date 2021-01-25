import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  description: Yup.string().required(),
  price: Yup.string().required(),
  volume: Yup.string().required(),
  diameter: Yup.string().required(),
  length: Yup.string().required(),
});

export default schema;
