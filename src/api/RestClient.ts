import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090',  
});

export const apiPost = (endpoint: string, data: any) => {
  return api.post(endpoint, data);
};

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  // Outros códigos de status...
};
