import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker';
import pt_br from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

import { useField } from '@unform/core';

import { Container, Label } from './styles';

registerLocale('pt-BR', pt_br);
setDefaultLocale('pt-BR');

function DatePicker({ name, label, ...rest }) {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Container isErrored={!!error}>
        <ReactDatePicker
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          {...rest}
        />
      </Container>
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

DatePicker.defaultProps = {
  name: '',
  label: '',
};

export default DatePicker;
