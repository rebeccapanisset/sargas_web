import * as Yup from 'yup';

export async function checkValidation(formRef, data, schema) {
  try {
    // Remove all previous errors
    formRef.current.setErrors({});

    await schema.validate(data, {
      abortEarly: false,
    });

    return true;
  } catch (err) {
    const validationErrors = {};

    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });

      formRef.current.setErrors(validationErrors);
      return false;
    }
  }
}
