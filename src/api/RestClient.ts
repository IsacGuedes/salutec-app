import axios, { AxiosResponse } from 'axios';

export const urlBackend = process.env.REACT_BACKEND_URL || 'http://localhost:8090';

const api = axios.create({
  baseURL: process.env.REACT_BACKEND_URL || 'http://localhost:8090', // Define a base URL da API
});

// Função genérica para requisições POST
export const apiPost = (endpoint: string, data: any): Promise<AxiosResponse<any>> => {
  return api.post(endpoint, data);
};

// Intercepta as requisições para adicionar o token no cabeçalho
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token'); // Remove o token se expirar ou for inválido
    window.location.href = "/login";
  }
})

// Função para requisições GET protegidas com token, recebe `navigate` como parâmetro
export const apiRequest = async (navigate: (path: string) => void) => {
  try {
    const response = await api.get('/api/protected-route'); // Usa a instância de `api` com o token já configurado
    // Trate a resposta conforme necessário
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Remove o token se expirar ou for inválido
      navigate('/login'); // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
};

// Códigos de status HTTP para reutilização
export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  // Outros códigos de status conforme necessário...
};

export default api;
