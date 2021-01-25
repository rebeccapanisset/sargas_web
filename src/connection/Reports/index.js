import { useApiService } from '~/services/api';

function useReport() {
  const { api } = useApiService();

  async function getReports(
    activePage,
    discontinued,
    expired,
    status,
    user,
    tankType,
    start_date,
    final_date
  ) {
    const response = await api.get('/reports', {
      params: {
        page: activePage,
        discontinued,
        expired,
        status,
        user,
        tankType,
        start_date,
        final_date,
      },
    });

    return response.data;
  }

  return {
    getReports,
  };
}

export { useReport };
