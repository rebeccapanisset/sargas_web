import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import CurrencyFormat from 'react-currency-format';
import ErrorMessagem from '~/components/ErrorMessage';
import { Label, Container, Loading } from './styles';

export default function CurrencyInput({ name, label, icon, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.state.value = value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        <Loading>{icon}</Loading>

        <CurrencyFormat
          ref={inputRef}
          id={name}
          value={defaultValue}
          onFocus={() => setFocused(true)}
          displayType="input"
          decimalSeparator=","
          thousandSeparator="."
          isNumericString
          prefix="R$ "
          onValueChange={(values) => {
            const { value } = values;
            inputRef.current.state.value = value;
          }}
          {...rest}
        />
        {error && (
          <ErrorMessagem title={error}>
            <FiAlertCircle size={15} />
          </ErrorMessagem>
        )}
      </Container>
    </>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};
CurrencyInput.defaultProps = {
  name: '',
  label: '',
};
