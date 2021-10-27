import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

const handleProduct = (store, product) => {
  if (store.state.products.includes(product)) return store.state.products;

  return [...store.state.products, product];
};

export const useCartStore = create((set) => ({
  state: {
    ...initialState,
  },
  actions: {
    toggle: () => set((store) => ({ state: { ...store.state, open: !store.state.open } })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    addProduct: (product) =>
      set((store) => ({
        state: { ...store.state, products: handleProduct(store, product) },
      })),
  },
}));
