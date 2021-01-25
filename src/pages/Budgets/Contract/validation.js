import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  financing_type: Yup.string().required(),
  pdf: Yup.string().required(),
});

export default schema;
