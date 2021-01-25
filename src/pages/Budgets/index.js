import React, { useState, useEffect, useCallback } from 'react';

import Moment from 'moment';

import { useParams } from 'react-router-dom';
import Toolbar from '~/components/Toolbar';
import { Container } from './styles';
import ModalDialog from '~/components/ModalDialog';
import { useBudget } from '~/connection/Budgets';
import { useFile } from '~/connection/File';
import Table from '~/components/BudgetTable';
import PaginationContainer from '~/components/PaginationContainer';

import status from '~/utils/status';

function Budget() {
  const { getBudgets, deleteBudget, sendBudget } = useBudget();
  const { getFile } = useFile();

  const [budgets, setBudgets] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [sendShow, setSendShow] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState({});
  const { type } = useParams();

  const title = [
    {
      title: 'Número',
      name: 'id',
    },
    {
      title: 'Cliente',
      name: 'client',
    },
    {
      title: 'Data',
      name: 'date',
    },
    {
      title: 'Produto',
      name: 'product',
    },
    {
      title: 'Status',
      name: 'status',
    },
  ];

  let time = null;

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const reset = useCallback(() => {
    setDeleteShow(false);
    setSendShow(false);
    setSelectedBudget({});
  }, []);

  const handleDeleteModal = useCallback((budget) => {
    setDeleteShow(true);
    setSelectedBudget(budget);
  }, []);

  const handleSendModal = useCallback((budget) => {
    setSendShow(true);
    setSelectedBudget(budget);
  }, []);

  async function handleDestroy(budget) {
    if (await deleteBudget(budget)) {
      reset();
    }
  }

  async function handleSendEmail(budget) {
    if (await sendBudget(budget)) {
      reset();
    }
  }

  const handleDownload = useCallback(async (budget) => {
    const response = await getFile(budget.pdf_id);
    const file = new Blob([response.data], { type: 'application/pdf' });
    window.open(URL.createObjectURL(file), '_blank');
  });

  async function loadBudgets(filter = '') {
    const response = await getBudgets(activePage, filter, type);
    const changedBudgets = response.data.map((budget) => {
      const budgetStatus = status.find(
        (option) => option.value === budget.status
      );
      return {
        ...budget,
        client: budget.client,
        date: Moment(budget.created_at).format('DD/MM/YYYY'),
        product: budget.product,
        status: budgetStatus.label,
      };
    });
    setBudgets(changedBudgets);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      loadBudgets(value);
    }, 200);
  }

  useEffect(() => {
    loadBudgets();
  }, [activePage, deleteShow, sendShow, type]);

  return (
    <Container>
      <Toolbar
        pageTitle="Lista de Orçamentos"
        button="Novo orçamento"
        path={`/orcamentos/cadastro/${type}`}
        isLink
        handleSearch={handleSearch}
      />
      <Table
        title={title}
        budgets={budgets}
        type={type}
        handleDeleteModal={handleDeleteModal}
        handleSendModal={handleSendModal}
        handleDownload={handleDownload}
      />

      <PaginationContainer
        activePage={activePage}
        data={budgets}
        paginate={paginate}
        handlePageChange={handlePageChange}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedBudget}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o orçamento:',
          value: selectedBudget.id,
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      <ModalDialog
        show={sendShow}
        onHide={reset}
        selectedItem={selectedBudget}
        content={{
          title: 'Enviar E-mail',
          body: 'Deseja enviar o seguinte orçamento por e-mail?',
          value: selectedBudget.id,
          confirmation: 'Enviar',
          confirmationBg: 'success',
        }}
        handleAction={handleSendEmail}
      />
    </Container>
  );
}

export default Budget;
