import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create((set) => ({
  state: {
    ...initialState,
  },
  actions: {
    toggle: () => set((store) => ({ state: { open: !store.state.open } })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    addProduct: (product) =>
      set((store) => ({
        state: { ...store.state, products: [...store.state.products, product] },
      })),
  },
}));
