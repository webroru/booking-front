import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import config from '@/config';

const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error)
);

export default apiClient;
