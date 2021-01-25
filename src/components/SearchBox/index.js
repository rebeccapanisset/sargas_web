import React, { useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

import { Container, Loading } from './styles';
import Input from '~/components/Input';

function SearchBox({ handleSearch }) {
  const formRef = useRef(null);
  return (
    <Container>
      <div>
        <Form ref={formRef}>
          <Input
            name="search"
            onKeyUp={handleSearch}
            placeholder="Pesquisar"
            icon={<FaSearch />}
          />
        </Form>
      </div>
    </Container>
  );
}

SearchBox.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBox;
