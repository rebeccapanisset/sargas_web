import React, { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { useAerial } from '~/connection/Products/Aerial';
import ModalDialog from '~/components/ModalDialog';
import FromAerial from '~/pages/Products/Aerial/FormAerial';
import Table from '~/components/TableContainer';

export default function Pipa() {
  const [aerials, setArials] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedAerial, setSelectedAerial] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteAerial, getAerials } = useAerial();

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

  let time = '';

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedAerial({});
  }, []);

  const handleClick = useCallback((model) => {
    if (model) {
      setSelectedAerial(model);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((model) => {
    setDeleteShow(true);
    setSelectedAerial(model);
  }, []);

  async function handleDestroy(model) {
    if (await deleteAerial(model)) {
      reset();
    }
  }

  async function loadUsers(filter = '') {
    const response = await getAerials(activePage, filter);
    setArials(response.data);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  useEffect(() => {
    loadUsers();
  }, [activePage, deleteShow, formShow]);

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadUsers(value);
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
        pageTitle="Lista de Tanques Pipa"
        handleClick={handleClick}
        button="Novo Tanque"
        handleSearch={handleSearch}
      />
      <Table title={title} contents={aerials} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={aerials}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedAerial}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o tanque:',
          value: selectedAerial.description,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FromAerial
          show={formShow}
          handleClose={reset}
          selectedItem={selectedAerial}
          update={update}
        />
      ) : null}
    </Container>
  );
}
