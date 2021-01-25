import React, { useState, useEffect, useCallback } from 'react';

import { Container } from './styles';

import PaginationContainer from '~/components/PaginationContainer';
import Toolbar from '~/components/Toolbar';
import { useAccessories } from '~/connection/Accessories';
import ModalDialog from '~/components/ModalDialog';
import FormAccessory from '~/pages/Accessory/FormAccessory';
import Table from '~/components/TableContainer';

export default function Accessory() {
  const [accessories, setAccessories] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteAccessories, getAccessories } = useAccessories();

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
      title: 'Preço',
      name: 'formatedPrice',
    },
  ];

  let time = null;

  const reset = useCallback(() => {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedAccessory({});
  }, []);

  const handleClick = useCallback((model) => {
    if (model) {
      setSelectedAccessory(model);
      setUpdate(true);
    }
    setFormShow(true);
  }, []);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const handleConfirm = useCallback((model) => {
    setDeleteShow(true);
    setSelectedAccessory(model);
  }, []);

  async function handleDestroy(model) {
    if (await deleteAccessories(model)) {
      reset();
    }
  }

  async function loadAccessories(filter = '', types = selectedType) {
    const response = await getAccessories(activePage, filter, types);

    setAccessories(response.data);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  async function handleSubmitCheckBox({ types }) {
    setSelectedType(types == 0 ? null : types);
    loadAccessories('', types == 0 ? null : types);
  }

  useEffect(() => {
    loadAccessories();
  }, [activePage, deleteShow, formShow]);

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadAccessories(value);
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
        pageTitle="Lista de Acessórios"
        handleClick={handleClick}
        button="Novo Acessório"
        hendleSearch={handleSearch}
        hasOptioins={handleSubmitCheckBox}
      />
      <Table title={title} contents={accessories} buttons={buttons} />
      <PaginationContainer
        activePage={activePage}
        data={accessories}
        handlePageChange={handlePageChange}
        paginate={paginate}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedAccessory}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o acessório:',
          value: selectedAccessory.name,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormAccessory
          show={formShow}
          handleClose={reset}
          selectedAccessory={selectedAccessory}
          update={update}
        />
      ) : null}
    </Container>
  );
}
