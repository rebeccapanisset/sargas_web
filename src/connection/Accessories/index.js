import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useAccessories() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Acessórios';

  async function getAccessories(activePage, filter, type) {
    const response = await api.get('/accessories', {
      params: {
        page: activePage,
        filter,
        type,
      },
    });

    return response.data;
  }

  async function getAcessory(id) {
    const response = await api.get(`/accessories/${id}`);

    return response.data;
  }

  async function storeAccessories(data) {
    try {
      const response = await api.post('/accessories', data);

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

  async function updateAccessories(data, id) {
    try {
      const response = await api.put(`/accessories/${id}`, data);

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

  async function deleteAccessories(id) {
    try {
      const response = await api.delete(`/accessories/${id}`);

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

  return {
    getAccessories,
    getAcessory,
    updateAccessories,
    deleteAccessories,
    storeAccessories,
  };
}

export { useAccessories };
