import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useClient() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Cliente';

  async function getClients(activePage, filter) {
    const response = await api.get('/clients', {
      params: {
        page: activePage,
        filter,
      },
    });

    return response.data;
  }

  async function getClient(id) {
    const response = await api.get(`/clients/${id}`);

    return response.data;
  }

  async function storeClient(data) {
    try {
      const response = await api.post('/clients', data);

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

  async function updateClient(data, id) {
    try {
      const response = await api.put(`/clients/${id}`, data);

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

  async function deleteClient(id) {
    try {
      const response = await api.delete(`/clients/${id}`);

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

  async function deletePhone(id) {
    try {
      const response = await api.delete(`/phones/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
        description: `Telefone deletado com sucesso`,
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar telefone',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar telefone',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao deletar telefone',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  return {
    getClients,
    getClient,
    updateClient,
    deleteClient,
    storeClient,
    deletePhone,
  };
}

export { useClient };
