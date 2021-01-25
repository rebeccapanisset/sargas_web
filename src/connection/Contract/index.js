import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useContract() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Contrato';

  async function storeContract(data) {
    try {
      const response = await api.post('/contracts', data);

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

  return { storeContract };
}

export { useContract };
