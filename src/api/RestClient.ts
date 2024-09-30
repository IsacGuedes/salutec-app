import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090',  
});

export const apiPost = (endpoint: string, data: any) => {
  return api.post(endpoint, data);
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ou de onde você estiver armazenando o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  // Outros códigos de status...
};
