import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

let refreshing = null;

api.interceptors.response.use((res) => res, async (error) => {
  if (error.response?.status !== 401 || error.config._retried) throw error;
  error.config._retried = true;
  if (!refreshing) {
    refreshing = api.post('/auth/refresh').then((r) => {
      useAuthStore.getState().setAccessToken(r.data.data.accessToken);
      return r.data.data.accessToken;
    }).finally(() => { refreshing = null; });
  }
  const token = await refreshing;
  error.config.headers.Authorization = 'Bearer ' + token;
  return api.request(error.config);
});

export default api;
