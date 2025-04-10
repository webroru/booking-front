import axios from 'axios';
import config from '@/config';

const apiClient = axios.create({
  baseURL: config.apiUrl || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчики ошибок, токены, логгеры и прочее:
apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
