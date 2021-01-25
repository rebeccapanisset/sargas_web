import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useBudget() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Orçamento';

  async function getBudgets(activePage, filter, type) {
    const response = await api.get('/budgets', {
      params: {
        page: activePage,
        filter,
        type,
      },
    });

    return response.data;
  }

  async function getBudget(id) {
    const response = await api.get(`/budgets/${id}`);

    return response.data;
  }

  async function storeBudget(data) {
    try {
      const response = await api.post('/budgets', data);

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

  async function updateBudget(data, id) {
    try {
      const response = await api.put(`/budgets/${id}`, data);

      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: `${message}  editado com sucesso`,
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

  async function deleteBudget(id) {
    try {
      const response = await api.delete(`/budgets/${id}`);

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

  async function negociateBudget(id, total, pdf_type_id) {
    try {
      const response = await api.put(`/negociate-budget/${id}`, {
        total,
        pdf_type_id,
      });

      addToast({
        type: 'success',
        title: 'Sucesso ao negociar',
        description: `${message} negociado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao negociar',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao negociar',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao negociar',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  async function sendBudget(id) {
    try {
      const response = await api.put(`send-budget/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao negociar',
        description: `${message} negociado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao negociar',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao negociar',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao negociar',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  return {
    getBudgets,
    getBudget,
    storeBudget,
    updateBudget,
    deleteBudget,
    negociateBudget,
    sendBudget,
  };
}

export { useBudget };
