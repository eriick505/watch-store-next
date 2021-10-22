import { renderHook } from '@testing-library/react-hooks';
import { Response } from 'miragejs';

import { makeServer } from '../miragejs/server';
import { useFetchProducts } from './useFetchProducts';

describe('useFetchProducts', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should return a list of 10 products', async () => {
    server.createList('product', 10);

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());
    await waitForNextUpdate();

    const { products, error } = result.current;

    expect(products).toHaveLength(10);
    expect(error).toBe(false);
  });

  it('should set error to true when catch() block is executed', async () => {
    server.get('products', () => new Response(500, {}, ''));

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());
    await waitForNextUpdate();

    const { products, error } = result.current;

    expect(error).toBe(true);
    expect(products).toHaveLength(0);
  });
});
