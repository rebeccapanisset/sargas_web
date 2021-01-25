import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useUser() {
  const { addToast } = useToast();
  const { api } = useApiService();

  async function getUsers(activePage, filter) {
    const response = await api.get('/users', {
      params: {
        page: activePage,
        filter,
      },
    });

    return response.data;
  }

  async function getUser(id) {
    const response = await api.get(`/users/${id}`);

    return response.data;
  }

  async function storeUser(data) {
    try {
      const response = await api.post('/users', data);

      addToast({
        type: 'success',
        title: 'Sucesso ao cadastrar',
        description: 'Usuário cadastrado com sucesso',
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

  async function updateUser(data, id) {
    try {
      const response = await api.put(`/users/${id}`, data);

      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: 'Usuário editado com sucesso',
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

  async function updatePassword(data) {
    try {
      const response = await api.put('passwords', data);

      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: 'Senha alterada com sucesso',
      });

      return response.data;
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

  async function deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
        description: 'Usuário deletado com sucesso',
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
    deleteUser,
    updatePassword,
    updateUser,
    getUser,
    getUsers,
    storeUser,
  };
}

export { useUser };
