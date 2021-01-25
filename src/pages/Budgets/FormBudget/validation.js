import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo Obrigatório',
  },
});

const schema = Yup.object().shape({
  delivery_days: Yup.string().required(),
  sale_type: Yup.string().required(),
  requester: Yup.string().required(),
  payment_method: Yup.number().required(),
  total: Yup.string().required(),
  amount: Yup.string().required(),
  pdf_template: Yup.string().required(),
});

export default schema;
