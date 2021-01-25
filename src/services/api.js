import axios from 'axios';
import { useToast } from '~/contexts/toast';

function useApiService() {
  const { addToast } = useToast();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.request._hasError === true) {
        addToast({
          type: 'error',
          title: 'Falha de conexão',
          description:
            'Opa, não conseguimos conectar no nosso servidor, verifique sua internet',
        });
      }

      if (error.response.status === 401) {
        const requestConfig = error.config;
        localStorage.clear();
        if (error.response.data.error.session !== 1) {
          addToast({
            type: 'info',
            title: 'Tempo de acesso expirado',
            description: 'Você foi deslogado, seu tempo de acesso expirou',
          });
        }

        return axios(requestConfig);
      }
      return Promise.reject(error);
    }
  );

  api.interceptors.request.use(
    (config) => {
      const sotarageToken = localStorage.getItem('@SGAuth:token');
      if (sotarageToken) {
        config.headers.Authorization = `Bearer ${sotarageToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { api };
}

export { useApiService };
