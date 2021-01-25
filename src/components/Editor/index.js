import React from 'react';
import PropTypes from 'prop-types';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import options from '~/utils/editor-options';

import { Container } from './styles';

function Editor({ name, placeholder, value, onBlur }) {
  return (
    <Container>
      {/* setContents => Para colocar o valor inicial */}
      {/* setDefaultStyle => Para colocar um estilo de fonte ou tamanho default */}
      <SunEditor
        name={name}
        placeholder={placeholder}
        setOptions={options}
        setContents={value}
        onBlur={onBlur}
      />
    </Container>
  );
}

Editor.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  placeholder: '',
  value: '',
};

export default Editor;
