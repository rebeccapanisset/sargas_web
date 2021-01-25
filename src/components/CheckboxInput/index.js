import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, Label, LabelInput } from './styles';

export default function CheckboxInput({ name, options, label, ...rest }) {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.value);
      },
      clearValue: (refs) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <div>
        {options.map((option, index) => (
          <LabelInput htmlFor={option.id} key={option.id}>
            <input
              defaultChecked={defaultValue.find((dv) => dv === option.id)}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={option.value}
              type="checkbox"
              id={option.id}
              {...rest}
            />

            <span>{option.label}</span>
          </LabelInput>
        ))}
      </div>
    </Container>
  );
}

CheckboxInput.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
};
CheckboxInput.defaultProps = {
  name: '',
};
