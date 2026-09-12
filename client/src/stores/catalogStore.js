import { create } from 'zustand';
import api from '../api/client';

export const useCatalogStore = create((set) => ({
  products: [],
  loading: false,
  filters: { q: '', tags: '', minPrice: '', maxPrice: '' },
  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),
  fetchProducts: async () => {
    set({ loading: true });
    const { filters } = useCatalogStore.getState();
    const res = await api.get('/products', { params: filters });
    set({ products: res.data.data.items, loading: false });
  },
}));
