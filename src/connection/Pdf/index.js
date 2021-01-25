import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function usePdf() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'PDF';

  async function getPdfs({ activePage, filter, doc_type, type }) {
    const response = await api.get('/pdfs', {
      params: {
        page: activePage,
        filter,
        doc_type,
        type,
      },
    });

    return response.data;
  }

  async function getPdf(id) {
    const response = await api.get(`/pdfs/${id}`);

    return response.data;
  }

  async function storePdf(data) {
    try {
      const response = await api.post('/pdfs', data);

      addToast({
        type: 'success',
        title: 'Sucesso ao cadastrar',
        description: `${message} cadastrado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  async function updatePdf(data, id) {
    try {
      const response = await api.put(`/pdfs/${id}`, data);

      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: `${message} editado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao editar',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  async function deletePdf(id) {
    try {
      const response = await api.delete(`/pdfs/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
        description: `${message} deletado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao deletar',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  async function showPdf(data) {
    try {
      const response = await api.post(
        '/pdf-test',
        {
          html: data,
        },
        { responseType: 'blob' }
      );

      addToast({
        type: 'success',
        title: `Sucesso ao gerar ${message}`,
        description: `${message} gerado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: `Erro ao gerar ${message}`,
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: `Erro ao gerar ${message}`,
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: `Erro ao gerar ${message}`,
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  async function makeDefault(id) {
    try {
      const response = await api.put(`/pdf-default/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao tornar principal',
        description: `${message} principal com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao tornar principal',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao tornar principal',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao tornar principal',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  return {
    getPdfs,
    getPdf,
    storePdf,
    updatePdf,
    deletePdf,
    showPdf,
    makeDefault,
  };
}

export { usePdf };
