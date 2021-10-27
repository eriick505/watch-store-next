import { renderHook, act } from '@testing-library/react-hooks';
import { makeServer } from '../../miragejs/server';
import { useCartStore } from './';

describe('Cart Store', () => {
  let server;
  let result;
  let toggle;
  let addProduct;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    toggle = result.current.actions.toggle;
    addProduct = result.current.actions.addProduct;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it('should return open equals false on initial state', async () => {
    expect(result.current.state.open).toBe(false);
  });

  it('should return an empty array for products on initial state', () => {
    expect(result.current.state.products).toHaveLength(0);
    expect(Array.isArray(result.current.state.products)).toBe(true);
  });

  it('should add 2 products to the list', async () => {
    const products = server.createList('product', 2);

    products.forEach((product) => act(() => addProduct(product)));

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should not add same product twice', () => {
    const product = server.create('product');

    act(() => addProduct(product));
    act(() => addProduct(product));

    expect(result.current.state.products).toHaveLength(1);
  });

  it('should toggle open state', async () => {
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);
  });
});
