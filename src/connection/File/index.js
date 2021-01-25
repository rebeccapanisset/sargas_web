import { useApiService } from '~/services/api';
import { useToast } from '~/contexts/toast';

function useFile() {
  const { addToast } = useToast();
  const { api } = useApiService();

  const message = 'Arquivo';

  async function getFile(id) {
    const response = await api.get(`files/${id}`, { responseType: 'blob' });

    return response;
  }

  async function storeFile(file, type) {
    try {
      const dataForm = new FormData();

      dataForm.append('file', file);
      dataForm.append('type', type);

      const response = await api.post('images', dataForm);

      return response.data;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar imagem',
          description: err.response.data.error.message,
        });

        return null;
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar imagem',
          description: err.response.data[0].message,
        });

        return null;
      }
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar imagem',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });

      return null;
    }
  }

  return { storeFile, getFile };
}

export { useFile };
