import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { FiAlertCircle, FiX, FiPlus } from 'react-icons/fi';
import ErrorMessagem from '~/components/ErrorMessage';
import Colors from '~/styles/colors';


import { Label, Container, Loading, ActionIcon, ActionButtons } from './styles';

export default function Input({ name, label, icon, hasloading, mask, remove, fnR, fnA, add, multiline, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setFocused(false);

    setFilled(!!inputRef.current?.value)

  }, []);


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);



  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {hasloading ? <Loading>
        {icon}
        </Loading> : icon}
        <ActionButtons action={add || remove}>
          {remove ? <ActionIcon onClick={fnR} type="button"><FiX size={18}/></ActionIcon> : ''}
          {add ? <ActionIcon onClick={fnA}  type="button"><FiPlus color={Colors().success} size={18}/></ActionIcon> : ''}
        </ActionButtons>
        {multiline ? (
          <textarea
          ref={inputRef}
            id={name}
            defaultValue={defaultValue}
            onFocus={() => setFocused(true)}
            onBlur={handleInputBlur}
            {...rest}
          >
          </textarea>
        ) : <input
          ref={inputRef}
          id={name}
          defaultValue={defaultValue}
          onFocus={() => setFocused(true)}
          onBlur={handleInputBlur}
          {...rest}
        />}
        {error && (
          <ErrorMessagem title={error}>
            <FiAlertCircle size={15} />
          </ErrorMessagem>
        )}
      </Container>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  hasloading:PropTypes.bool,
  multiline: PropTypes.bool,
  add: PropTypes.bool,
  remove: PropTypes.bool,
  fnA: PropTypes.func,
  fnR: PropTypes.func,
};
Input.defaultProps = {
  name: '',
  label: '',
  hasloading:false,
  add: false,
  remove: false,
  fnA: '',
  fnR: '',
  multiline: false
};
