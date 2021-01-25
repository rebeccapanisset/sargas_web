import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useField } from '@unform/core';
import ErrorMessagem from '~/components/ErrorMessage'
import defaultImage from '~/assets/default-image.png'
import {FiAlertCircle} from 'react-icons/fi'

import { Container, Label } from './styles';

function FileInput({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const {fieldName, registerField, defaultValue, error} = useField(name)
  const [preview, setPreview] = useState(defaultValue)
  const [fileNotFound, setFileNotFound] = useState(false)
  
  const handlePreview = useCallback(e => {
    const file = e.target.files?.[0]
    
    if(!file) {
      setPreview(null)
    }else{
      if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif'){
        setPreview(null)
        setFileNotFound(true)
      }else{
        setFileNotFound(false)
        const previewURL = URL.createObjectURL(file)
        setPreview(previewURL)
      }
    
    }

  })

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      }
    })
  }, [fieldName, registerField])

  return (
    <Container>
     <>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
        />
        
        { fileNotFound ? <strong>Arquivo não permitido <br></br> <img src={defaultImage} alt="Default" width="100" /></strong> : preview && <img src={preview} alt="Preview" width="100" /> }
        <span>
        {error && (
          <ErrorMessagem title={error}>
            <FiAlertCircle size={15} />
          </ErrorMessagem>
        )}
        </span>
    </>
    </Container>
  );
}

export default FileInput;
