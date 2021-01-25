import React, { useState, useEffect, useCallback } from 'react';

import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { useFuel } from '~/connection/Products/Fuel';
import ModalDialog from '~/components/ModalDialog';
import FormFuel from '~/pages/Products/Fuel/FormFuel';
import Table from '~/components/TableContainer';

export default function Fuel() {
  const [fuels, setFuels] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteFuel, getFuels } = useFuel();

  const title = [
    {
      title: '#id',
      name: 'id',
    },
    {
      title: 'Descrição',
      name: 'description',
    },
    {
      title: 'Preço',
      name: 'formatedPrice',
    },
    {
      title: 'Volume',
      name: 'volume',
    },
  ];

  let time = null;

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedFuel({});
  }, []);

  const handleClick = useCallback((model) => {
    if (model) {
      setSelectedFuel(model);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((model) => {
    setDeleteShow(true);
    setSelectedFuel(model);
  }, []);

  async function handleDestroy(model) {
    if (await deleteFuel(model)) {
      reset();
    }
  }

  async function loadTanks(filter = '') {
    const response = await getFuels(activePage, filter);

    setFuels(response.data);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  useEffect(() => {
    loadTanks();
  }, [activePage, deleteShow, formShow]);

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadTanks(value);
    }, 200);
  }

  const buttons = [
    {
      title: 'Editar',
      bg: 'primary',
      isLink: false,
      handleAction: handleClick,
    },
    {
      title: 'Deletar',
      bg: 'danger',
      isLink: false,
      handleAction: handleConfirm,
    },
  ];

  return (
    <Container>
      <Toolbar
        pageTitle="Lista de Tanques de Combustível"
        handleClick={handleClick}
        button="Novo Tanque"
        handleSearch={handleSearch}
      />
      <Table title={title} contents={fuels} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={fuels}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedFuel}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o tanque:',
          value: selectedFuel.description,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormFuel
          show={formShow}
          handleClose={reset}
          selectedItem={selectedFuel}
          update={update}
        />
      ) : null}
    </Container>
  );
}
