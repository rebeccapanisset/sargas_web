import React, { useState, useEffect, useCallback } from 'react';

import Toolbar from '~/components/Toolbar';
import { Container } from './styles';
import ModalDialog from '~/components/ModalDialog';
import { useClient } from '~/connection/Clients';
import Table from '~/components/TableContainer';
import PaginationContainer from '~/components/PaginationContainer';

function Clients() {
  const { getClients, deleteClient } = useClient();

  const [clients, setClients] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const title = [
    {
      title: '#id',
      name: 'id',
    },
    {
      title: 'Nome',
      name: 'name',
    },
    {
      title: 'Telefone',
      name: 'phone',
    },
    {
      title: 'CPF/CNPJ',
      name: 'cpf_cnpj',
    },
  ];

  let time = null;

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setSelectedClient({});
  }, []);

  const handleConfirm = useCallback((client) => {
    setDeleteShow(true);
    setSelectedClient(client);
  }, []);

  async function handleDestroy(client) {
    if (await deleteClient(client)) {
      reset();
    }
  }

  async function loadClients(filter = '') {
    const response = await getClients(activePage, filter);
    const changedClient = response.data.map((client) => {
      return { ...client, phone: client.phones[0]?.number || '-' };
    });
    setClients(changedClient);
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
      isLink: true,
      path: '/clientes/cadastro',
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
        pageTitle="Lista de Clientes"
        button="Novo cliente"
        path="/clientes/cadastro"
        handleSearch={handleSearch}
        isLink
      />
      <Table title={title} contents={clients} buttons={buttons} />

      <PaginationContainer
        activePage={activePage}
        data={clients}
        paginate={paginate}
        handlePageChange={handlePageChange}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedClient}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o cliente:',
          value: selectedClient.name,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
    </Container>
  );
}

export default Clients;
