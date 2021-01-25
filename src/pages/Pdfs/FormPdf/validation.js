import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
});

export default schema;
