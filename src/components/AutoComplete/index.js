import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { FiPlusCircle } from 'react-icons/fi';

import {
  Container,
  InputContent,
  Label,
  Content,
  ItemContent,
  Item,
  NotHaveContent,
  AddNewButton,
} from './styles';

function AutoComplete({
  name,
  options,
  handleChangeValue,
  handleSelectItem,
  label,
  ...rest
}) {
  const [activeContent, setActiveContent] = useState(false);
  const contentBox = useRef(null);
  const inputRef = useRef(null);

  const handleOpenContent = useCallback((e) => {
    const filter = e.target.value;

    setActiveContent(!activeContent);

    handleChangeValue(name, filter);
  }, []);

  const handleClick = useCallback((option) => {
    handleSelectItem(option, inputRef, name);

    setActiveContent(false);
  }, []);

  const handleClose = ({ target }) => {
    if (contentBox.current && !contentBox.current.contains(target)) {
      setActiveContent(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClose);
  }, []);

  return (
    <Container ref={contentBox}>
      <Label>{label}</Label>
      <InputContent>
        <input
          type="text"
          onChange={handleOpenContent}
          onFocus={handleOpenContent}
          ref={inputRef}
          {...rest}
        />
      </InputContent>
      <Content active={activeContent}>
        {options.length ? (
          <ItemContent>
            {options &&
              options.map((option) => (
                <Item
                  key={String(Math.random())}
                  type="button"
                  onClick={() => {
                    handleClick(option);
                  }}
                >
                  <strong>{option.itemArea.title}</strong>
                  {option.itemArea.subtitle}
                </Item>
              ))}
          </ItemContent>
        ) : (
          <NotHaveContent>
            <div>Nenhuma informação encontrada!</div>
            <AddNewButton onClick={() => {}}>
              <FiPlusCircle size={18} />
            </AddNewButton>
          </NotHaveContent>
        )}
      </Content>
    </Container>
  );
}

AutoComplete.propTypes = {
  options: PropTypes.arrayOf().isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rest: PropTypes.objectOf({
    placeholder: PropTypes.string,
    label: PropTypes.string,
    handleSelected: PropTypes.func,
  }).isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
};

export default AutoComplete;
