import React, { useState, useEffect, useCallback } from 'react';

import Toolbar from '~/components/Toolbar';
import { Container } from './styles';
import ModalDialog from '~/components/ModalDialog';
import { usePdf } from '~/connection/Pdf';
import Table from '~/components/TableContainer';
import PaginationContainer from '~/components/PaginationContainer';

function Pdfs() {
  const { getPdfs, deletePdf, makeDefault } = usePdf();

  const [pdfs, setPdfs] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginate, setPaginate] = useState({});
  const [deleteShow, setDeleteShow] = useState(false);
  const [defaultShow, setDefaultShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState({});

  const title = [
    {
      title: '#id',
      name: 'id',
    },
    {
      title: 'Título',
      name: 'title',
    },
    {
      title: 'Tipo',
      name: 'type',
    },
    {
      title: 'Documento',
      name: 'doc_type',
    },
    {
      title: 'Principal',
      name: 'default',
    },
  ];

  let time = null;

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  const reset = useCallback(() => {
    setDefaultShow(false);
    setDeleteShow(false);
    setFormShow(false);
    setSelectedPdf({});
  }, []);

  const handleConfirm = useCallback((pdf) => {
    setDeleteShow(true);
    setSelectedPdf(pdf);
  }, []);

  const handleDefault = useCallback((pdf) => {
    setDefaultShow(true);
    setSelectedPdf(pdf);
  }, []);

  async function handleDestroy(pdf) {
    if (await deletePdf(pdf)) {
      reset();
    }
  }

  async function handleMakeDefault(pdf) {
    if (await makeDefault(pdf)) {
      reset();
    }
  }

  async function loadPdfs(filter = '') {
    const response = await getPdfs(activePage, filter);
    const changedPdfs = response.data.map((pdf) => {
      return {
        ...pdf,
        type: pdf.type.name,
        doc_type: pdf.documentType.name,
        default: pdf.default ? 'Sim' : 'Não',
      };
    });

    setPdfs(changedPdfs);
    setPaginate({
      total: response.total,
      perPage: response.perPage,
    });
  }

  function handleSearch(e) {
    const { value } = e.target;
    clearTimeout(time);
    time = setTimeout(() => {
      // TODO: Ver como está feito o filtro de tipo em acessório
      loadPdfs(value);
    }, 200);
  }

  useEffect(() => {
    loadPdfs();
  }, [activePage, defaultShow, deleteShow, formShow]);

  const buttons = [
    {
      title: 'Editar',
      bg: 'primary',
      isLink: true,
      path: '/pdfs/cadastro',
    },
    {
      title: 'Deletar',
      bg: 'danger',
      isLink: false,
      handleAction: handleConfirm,
    },
    {
      title: 'Principal',
      bg: 'info',
      isLink: false,
      handleAction: handleDefault,
    },
  ];

  return (
    <Container>
      <Toolbar
        pageTitle="Lista de PDFs"
        button="Novo PDF"
        path="/pdfs/cadastro"
        handleSearch={handleSearch}
        isLink
      />
      <Table title={title} contents={pdfs} buttons={buttons} />

      <PaginationContainer
        activePage={activePage}
        data={pdfs}
        paginate={paginate}
        handlePageChange={handlePageChange}
      />
      <ModalDialog
        show={deleteShow}
        onHide={reset}
        selectedItem={selectedPdf}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja realmente deletar o PDF:',
          value: selectedPdf.title,
          confirmation: 'Deletar',
          confirmationBg: 'danger',
        }}
        handleAction={handleDestroy}
      />
      <ModalDialog
        show={defaultShow}
        onHide={reset}
        selectedItem={selectedPdf}
        content={{
          title: 'Confirmação de Principal',
          body: 'Deseja realmente fazer esse PDF o principal:',
          value: selectedPdf.title,
          confirmation: 'Sim',
          confirmationBg: 'primary',
        }}
        handleAction={handleMakeDefault}
      />
    </Container>
  );
}

export default Pdfs;
