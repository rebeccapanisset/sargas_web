import { useApiService } from '~/services/api';

function useTankTypes() {
  const { api } = useApiService();

  async function getTankTypes(type) {
    const response = await api.get('/tank-types', {
      params: {
        filter: type,
      },
    });

    return response.data;
  }

  async function getTankType(id) {
    const response = await api.get(`/tank-types/${id}`);

    return response.data;
  }

  return {
    getTankTypes,
    getTankType,
  };
}

export { useTankTypes };
