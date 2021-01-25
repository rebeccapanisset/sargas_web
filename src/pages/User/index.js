import React, { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { useUser } from '~/connection/User';
import ModalDialog from '~/components/ModalDialog';
import FormUser from '~/pages/User/FormUser';
import Table from '~/components/TableContainer';

export default function User() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteUser, getUsers } = useUser();

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
      title: 'E-mail',
      name: 'email',
    },
  ];

  let time = null;

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedUser({});
  }, []);

  const handleClick = useCallback((user) => {
    if (user) {
      setSelectedUser(user);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((user) => {
    setDeleteShow(true);
    setSelectedUser(user);
  }, []);

  async function handleDestroy(user) {
    if (await deleteUser(user)) {
      reset();
    }
  }

  async function loadUsers(filter = '') {
    const response = await getUsers(activePage, filter);
    setUsers(response.data);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadUsers(value);
    }, 200);
  }

  useEffect(() => {
    loadUsers();
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
        pageTitle="Lista de Usuários"
        handleClick={handleClick}
        button="Novo Usuário"
        handleSearch={handleSearch}
      />
      <Table title={title} contents={users} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={users}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedUser}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja Realmente deletar o usuário:',
          value: selectedUser.name,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormUser
          show={formShow}
          handleClose={reset}
          selectedUser={selectedUser}
          update={update}
        />
      ) : null}
    </Container>
  );
}
