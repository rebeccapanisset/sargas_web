import { useApiService } from '~/services/api';

function useDocumentTypes() {
  const { api } = useApiService();

  async function getDocumentTypes() {
    const response = await api.get('/document-types');

    return response.data;
  }

  async function getDocumentType(id) {
    const response = await api.get(`/document-types/${id}`);

    return response.data;
  }

  return {
    getDocumentTypes,
    getDocumentType,
  };
}

export { useDocumentTypes };
