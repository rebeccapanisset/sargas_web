import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, Label, LabelInput } from './styles';

export default function RadioInput({
  name,
  options,
  label,
  functionThatSubmitsForm,
  defaultOptions,
  ...rest
}) {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  let op = options;

  if (defaultOptions) {
    op = [...options, defaultOptions];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find((ref) => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find((ref) => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <div>
        {op.map((option, index) => (
          <LabelInput htmlFor={option.id} key={option.id}>
            <input
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              type="radio"
              name={fieldName}
              value={option.id}
              onClick={functionThatSubmitsForm}
              defaultChecked={defaultValue === option.id}
            />

            <span>{option.label}</span>
          </LabelInput>
        ))}
      </div>
    </Container>
  );
}

RadioInput.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
};
RadioInput.defaultProps = {
  name: '',
};
