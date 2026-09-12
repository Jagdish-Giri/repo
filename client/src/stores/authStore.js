import { create } from 'zustand';
import api from '../api/client';

export const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    set({ accessToken: res.data.data.accessToken });
  },
  logout: async () => {
    await api.post('/auth/logout');
    set({ accessToken: null, user: null });
  },
}));
