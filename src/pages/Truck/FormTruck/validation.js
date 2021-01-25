import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
  number: 'O campo precisa ser um número',
});

const schema = Yup.object().shape({
  plate: Yup.string().required(),
  brand: Yup.string().required(),
  model: Yup.string().required(),
  year: Yup.string(),
  color: Yup.string(),
  chassi: Yup.string(),
  axes_number: Yup.string().required(),
  between_axes: Yup.string().required(),
});

export default schema;
