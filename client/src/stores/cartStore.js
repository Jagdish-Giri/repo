import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  drawerOpen: false,
  addItem: (item) => set((s) => ({ items: [...s.items, item], drawerOpen: true })),
  removeItem: (index) => set((s) => ({ items: s.items.filter((_, i) => i !== index) })),
  clear: () => set({ items: [] }),
  toggleDrawer: (drawerOpen) => set({ drawerOpen }),
}));
