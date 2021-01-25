import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useConfiguration() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Configurações';

  async function getConfigurations() {
    const response = await api.get('/configurations');

    return response.data;
  }

  async function updateConfiguration(data) {
    try {
      const response = await api.put('/configurations', data);

      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: `${message} editadas com sucesso`,
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

  async function deletePaymentMethod(id) {
    try {
      const response = await api.delete(`/payment-methods/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
        description: 'Forma de pagamento deletada com sucesso',
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

  async function deleteSaleType(id) {
    try {
      const response = await api.delete(`/sale-types/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
        description: 'Tipo de venda deletada com sucesso',
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
    getConfigurations,
    updateConfiguration,
    deletePaymentMethod,
    deleteSaleType,
  };
}

export { useConfiguration };
