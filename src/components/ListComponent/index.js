import React, { useState, useCallback } from 'react';

import Table from '~/components/TableContainer';
import ModalDialog from '~/components/ModalDialog';
import Toolbar from '~/components/Toolbar';
import PaginationContainer from '~/components/PaginationContainer';
import { Container } from './styles';

function ListComponent({
  title,
  content,
  handleDestroy,
  handlePageChange,
  paginate,
  activePage,
  children,
}) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [update, setUpdate] = useState(false);

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedUser({});
  }, []);

  const handleClick = useCallback((data) => {
    if (data) {
      setSelectedUser(data);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  const handleConfirm = useCallback((data) => {
    setDeleteShow(true);
    setSelectedUser(data);
  }, []);

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
      />
      <Table title={title} contents={content} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={content}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedUser}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o usuário:',
          value: selectedUser.name,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
    </Container>
  );
}

export default ListComponent;
