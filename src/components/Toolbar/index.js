import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import Button from '~/components/Button';
import LinkElement from '~/components/LinkElement';
import { useTankTypes } from '~/connection/TankTypes';
import RadioInput from '~/components/RadioInput';
import { Container, ContainerSearchBox } from './styles';

import SearchBox from '~/components/SearchBox';

function Toolbar({
  handleClick,
  button,
  isLink,
  path,
  handleSearch,
  hasOptioins,
}) {
  const { getTankTypes } = useTankTypes();
  const [types, setTypes] = useState([]);
  const formRef = useRef();

  const def = {
    id: 0,
    value: 0,
    label: 'Todos',
  };

  function functionThatSubmitsForm() {
    formRef.current.submitForm();
  }

  useEffect(() => {
    async function loadTankTypes() {
      const response = await getTankTypes();
      setTypes(
        response.map((type) => {
          return {
            id: type.id,
            value: type.id,
            label: type.name,
          };
        })
      );
    }

    loadTankTypes();
  }, []);

  return (
    <>
      <Container>
        <ContainerSearchBox>
          <SearchBox handleSearch={handleSearch} />
          {hasOptioins && (
            <Form ref={formRef} onSubmit={hasOptioins}>
              <RadioInput
                name="types"
                functionThatSubmitsForm={functionThatSubmitsForm}
                options={types}
                defaultOptions={def}
              />
            </Form>
          )}
        </ContainerSearchBox>
        {isLink ? (
          <LinkElement to={path} bg="primary">
            {button}
          </LinkElement>
        ) : (
          <Button type="button" bg="primary" onClick={() => handleClick(false)}>
            {button}
          </Button>
        )}
      </Container>
    </>
  );
}

Toolbar.propTypes = {
  handleClick: PropTypes.func,
  button: PropTypes.string.isRequired,
  isLink: PropTypes.bool,
  path: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  hasOptioins: PropTypes.bool,
};

Toolbar.defaultProps = {
  handleClick: () => {},
  isLink: false,
  path: '',
  hasOptioins: false,
};

export default Toolbar;
