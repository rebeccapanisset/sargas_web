import React, { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { useTruck } from '~/connection/Truck';
import ModalDialog from '~/components/ModalDialog';
import FormTruck from '~/pages/Truck/FormTruck';
import Table from '~/components/TableContainer';

export default function Truck() {
  const [trucks, setTrucks] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteTruck, getTrucks } = useTruck();

  const title = [
    {
      title: '#id',
      name: 'id',
    },
    {
      title: 'Marca',
      name: 'brand',
    },
    {
      title: 'Placa',
      name: 'plate',
    },
    {
      title: 'Modelo',
      name: 'model',
    },
  ];

  let time = null;

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedTruck({});
  }, []);

  const handleClick = useCallback((user) => {
    if (user) {
      setSelectedTruck(user);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((user) => {
    setDeleteShow(true);
    setSelectedTruck(user);
  }, []);

  async function handleDestroy(user) {
    if (await deleteTruck(user)) {
      reset();
    }
  }

  async function loadClients(filter = '') {
    const response = await getTrucks(activePage, filter);
    setTrucks(response.data);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadClients(value);
    }, 200);
  }

  useEffect(() => {
    loadClients();
  }, [activePage, deleteShow, formShow]);

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
        pageTitle="Lista de Caminhões"
        handleClick={handleClick}
        button="Novo Camihão"
        handleSearch={handleSearch}
      />
      <Table title={title} contents={trucks} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={trucks}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedTruck}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o caminhão:',
          value: `${selectedTruck.plate} - ${selectedTruck.model}`,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormTruck
          show={formShow}
          handleClose={reset}
          selectedTruck={selectedTruck}
          update={update}
        />
      ) : null}
    </Container>
  );
}
