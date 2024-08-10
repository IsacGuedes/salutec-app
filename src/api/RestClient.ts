import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8085',  // URL base da sua API
});
