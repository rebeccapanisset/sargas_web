import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { FiAlertCircle, FiX, FiPlus } from 'react-icons/fi';
import ErrorMessagem from '~/components/ErrorMessage';
import MaskedInput from 'react-text-mask'
import { Label, Container, Loading, ActionIcon, ActionButtons } from './styles';
import Colors from '~/styles/colors';


export default function InputMasked({ name, label, icon, mask, remove, fnR, fnA, add,  ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback((e) => {
    setFocused(false);
    
    setFilled(!!inputRef.current?.value)

  }, []);
  
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.inputElement.value = value;
      },
    });


  }, [fieldName, registerField]);



  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        <Loading>
        {icon}
        </Loading>
        <ActionButtons action={add || remove}>
          {remove ? <ActionIcon onClick={fnR} type="button"><FiX size={18}/></ActionIcon> : ''}
          {add ? <ActionIcon onClick={fnA}  type="button"><FiPlus color={Colors().success} size={18}/></ActionIcon> : ''}
        </ActionButtons>
        
        <MaskedInput
          ref={inputRef}
          id={name}
          defaultValue={defaultValue}
          onFocus={() => setFocused(true)}
          onBlur={handleInputBlur}
          mask={mask}
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

InputMasked.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  remove: PropTypes.bool,
  fnA: PropTypes.func,
  fnR: PropTypes.func,
};
InputMasked.defaultProps = {
  name: '',
  label: '',
  remove: false,
  fnA: '',
  fnR: ''
};
