import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GiBackForth } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { useAccessories } from '~/connection/Accessories';
import { useTankTypes } from '~/connection/TankTypes';
import {
  Container,
  Options,
  Icon,
  SelectedItens,
  Iten,
  Search,
  HeaderSelected,
  SarchInput,
} from './styles';

function MultiSelect({ typeTank, selected, handleSelectedAccessories }) {
  const { getAccessories } = useAccessories();
  const { getTankTypes } = useTankTypes();

  const [accessories, setAccessories] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  let time = null;

  async function loadAccessories(fitler) {
    const tankType = await getTankTypes(typeTank);
    const [type] = tankType;
    const response = await getAccessories(1, fitler, type.id);
    const { data } = response;
    setAccessories(data);

    if (selected.length > 0) {
      const options = data.filter(
        (a) => selected.filter((s) => s.id !== a.id).length === selected.length
      );

      setAccessories(options);
      setSelectedAccessories(selected);
    }
  }

  const handleSelectAccessory = (accessory) => {
    setAccessories(accessories.filter((a) => a.id !== accessory.id));

    setSelectedAccessories([...selectedAccessories, accessory]);

    handleSelectedAccessories([...selectedAccessories, accessory]);
  };

  const handleUnSelectAccessory = (accessory) => {
    setSelectedAccessories(
      selectedAccessories.filter((a) => a.id !== accessory.id)
    );

    setAccessories([...accessories, accessory]);

    handleSelectedAccessories(
      selectedAccessories.filter((a) => a.id !== accessory.id)
    );
  };

  useEffect(() => {
    loadAccessories();
  }, [selected]);

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadAccessories(value);
    }, 500);
  }

  return (
    <Container>
      <Options>
        <Search>
          <SarchInput
            onChange={handleSearch}
            type="text"
            placeholder="Pesquisar"
          />
          <FaSearch />
        </Search>
        <div>
          {accessories.map((accessory) => (
            <Iten
              onClick={() => {
                handleSelectAccessory(accessory);
              }}
            >
              {accessory.name}
            </Iten>
          ))}
        </div>
      </Options>
      <Icon>
        <GiBackForth size={40} />
      </Icon>
      <SelectedItens>
        <HeaderSelected>Acessórios Adicionados</HeaderSelected>
        <div>
          {selectedAccessories.map((accessory) => (
            <Iten
              key={accessory.id}
              onClick={() => {
                handleUnSelectAccessory(accessory);
              }}
            >
              {accessory.name}
            </Iten>
          ))}
        </div>
      </SelectedItens>
    </Container>
  );
}

MultiSelect.propTypes = {
  typeTank: PropTypes.string.isRequired,
  handleSelectedAccessories: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string || PropTypes.number,
      label: PropTypes.string || PropTypes.number,
    })
  ).isRequired,
};

export default MultiSelect;
