import React, { useState, useEffect, useCallback } from 'react';

import Moment from 'moment';

import Toolbar from '~/components/ReportToolbar';
import { Container } from './styles';
import { useReport } from '~/connection/Reports';
import { useFile } from '~/connection/File';
import Table from '~/components/TableContainer';
import PaginationContainer from '~/components/PaginationContainer';

import statusList from '~/utils/status';

function Reports() {
  const { getReports } = useReport();
  const { getFile } = useFile();

  const [activePage, setActivePage] = useState(1);
  const [budgetDiscont, setBudgetDiscont] = useState(false);
  const [budgetExp, setBudgetExp] = useState(false);
  const [budgetStatus, setBudgetStatus] = useState('');
  const [budgetUser, setBudgetUser] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [initialDate, setInitialDate] = useState(null);
  const [paginate, setPaginate] = useState({});
  const [reports, setReports] = useState([]);
  const [tankType, setTankType] = useState(null);

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
      title: 'Tipo',
      name: 'type',
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

  const handleDownload = useCallback(async (budget) => {
    const response = await getFile(budget.pdf_id);
    const file = new Blob([response.data], { type: 'application/pdf' });
    window.open(URL.createObjectURL(file), '_blank');
  }, []);

  async function loadReports(
    discontinued,
    expired,
    status,
    user,
    tank_type,
    start_date,
    final_date
  ) {
    const response = await getReports(
      activePage,
      discontinued,
      expired,
      status,
      user,
      tank_type,
      start_date,
      final_date
    );
    if (response.data) {
      const changedBudgets = response.data.map((budget) => {
        const selectedStatus = statusList.find(
          (option) => option.value === budget.status
        );
        return {
          ...budget,
          client: budget.client,
          date: Moment(budget.created_at).format('DD/MM/YYYY'),
          product: budget.product,
          status: selectedStatus.label,
          type: budget.type,
        };
      });
      setReports(changedBudgets);
    } else {
      setReports([]);
    }
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  async function handleSearch(data) {
    const { startDate, endDate, status, types, user, tank_type } = data;
    let discontinued = false;
    let expired = false;

    setInitialDate(startDate);
    setFinalDate(endDate);
    setBudgetStatus(status);
    setBudgetUser(user);
    setTankType(tank_type);

    types.forEach((type) => {
      if (type === '1') {
        discontinued = true;
        setBudgetDiscont(true);
      }
      if (type === '2') {
        expired = true;
        setBudgetExp(true);
      }
    });

    clearTimeout(time);
    time = setTimeout(() => {
      loadReports(
        discontinued,
        expired,
        status,
        user,
        tank_type,
        startDate,
        endDate
      );
    }, 200);
  }

  useEffect(() => {
    loadReports(
      budgetDiscont,
      budgetExp,
      budgetStatus,
      budgetUser,
      tankType,
      initialDate,
      finalDate
    );
  }, [activePage]);

  const buttons = [
    {
      title: 'Download',
      bg: 'primary',
      isLink: false,
      handleAction: handleDownload,
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
      <Table title={title} contents={reports} buttons={buttons} />

      <PaginationContainer
        activePage={activePage}
        data={reports}
        paginate={paginate}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
}

export default Reports;
