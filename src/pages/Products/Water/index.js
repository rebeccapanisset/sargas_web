import React, { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { useWater } from '~/connection/Products/Water';
import ModalDialog from '~/components/ModalDialog';
import FormWater from '~/pages/Products/Water/FormWater';
import Table from '~/components/TableContainer';

export default function Pipa() {
  const [waters, setWaters] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedWater, setSelectedWater] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteWater, getWaters } = useWater();

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
    setSelectedWater({});
  }, []);

  const handleClick = useCallback((model) => {
    if (model) {
      setSelectedWater(model);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((model) => {
    setDeleteShow(true);
    setSelectedWater(model);
  }, []);

  async function handleDestroy(model) {
    if (await deleteWater(model)) {
      reset();
    }
  }

  async function loadTanks(filter = '') {
    const response = await getWaters(activePage, filter);
    setWaters(response.data);
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
        pageTitle="Lista de Caixa D'água"
        handleClick={handleClick}
        button="Nova Caixa D'água"
        handleSearch={handleSearch}
      />
      <Table title={title} contents={waters} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={waters}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedWater}
        content={{
          title: 'Confirmação de Deleção',
          body: "Deseja realmente deletar a caixa d'água:",
          value: selectedWater.description,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormWater
          show={formShow}
          handleClose={reset}
          selectedItem={selectedWater}
          update={update}
        />
      ) : null}
    </Container>
  );
}
