import React, { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { usePipa } from '~/connection/Products/Pipa';
import ModalDialog from '~/components/ModalDialog';
import FormPipa from '~/pages/Products/Pipa/FormPipa';
import Table from '~/components/TableContainer';

export default function Pipa() {
  const [pipas, setPipas] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedPipa, setSelectedPipa] = useState({});
  const [update, setUpdate] = useState(false);
  const { deletePipa, getPipas } = usePipa();

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
    setSelectedPipa({});
  }, []);

  const handleClick = useCallback((model) => {
    if (model) {
      setSelectedPipa(model);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((model) => {
    setDeleteShow(true);
    setSelectedPipa(model);
  }, []);

  async function handleDestroy(model) {
    if (await deletePipa(model)) {
      reset();
    }
  }

  async function loadTanks(filter = '') {
    const response = await getPipas(activePage, filter);
    setPipas(response.data);
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
        pageTitle="Lista de Tanques Pipa"
        handleClick={handleClick}
        button="Novo Tanque"
        handleSearch={handleSearch}
      />
      <Table title={title} contents={pipas} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={pipas}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedPipa}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o tanque:',
          value: selectedPipa.description,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormPipa
          show={formShow}
          handleClose={reset}
          selectedItem={selectedPipa}
          update={update}
        />
      ) : null}
    </Container>
  );
}
