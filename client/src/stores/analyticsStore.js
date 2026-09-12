import { create } from 'zustand';
import api from '../api/client';

export const useAnalyticsStore = create((set) => ({
  commandCenter: null,
  traffic: null,
  load: async () => {
    const [cc, tr] = await Promise.all([api.get('/admin/command-center'), api.get('/admin/traffic')]);
    set({ commandCenter: cc.data.data, traffic: tr.data.data });
  },
}));
