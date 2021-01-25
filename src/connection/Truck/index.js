import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useTruck() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Caminhão';

  async function getTrucks(activePage, filter) {
    const response = await api.get('/trucks', {
      params: {
        page: activePage,
        filter,
      },
    });

    return response.data;
  }

  async function getTruck(id) {
    const response = await api.get(`/trucks/${id}`);

    return response.data;
  }

  async function storeTruck(data) {
    try {
      const response = await api.post('/trucks', data);

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

  async function updateTruck(data, id) {
    try {
      const response = await api.put(`/trucks/${id}`, data);

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

  async function deleteTruck(id) {
    try {
      const response = await api.delete(`/trucks/${id}`);

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
    getTrucks,
    getTruck,
    storeTruck,
    updateTruck,
    deleteTruck,
  };
}

export { useTruck };
