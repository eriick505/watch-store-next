import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { makeServer } from '../miragejs/server';
import { useCartStore } from '../store/cart';

import Cart from './Cart';

describe('Cart', () => {
  let server;
  let result;
  let addProduct;
  let toggle;
  let spyToggle;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    addProduct = result.current.actions.addProduct;
    toggle = result.current.actions.toggle;

    spyToggle = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add class "hidden" in the component', async () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should remove class "hidden" when toggle is called', async () => {
    act(() => toggle());

    render(<Cart />);

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', async () => {
    render(<Cart />);

    const button = screen.getByTestId('close-button');

    act(() => {
      userEvent.click(button);
      userEvent.click(button);
    });

    expect(spyToggle).toHaveBeenCalledTimes(2);
  });

  it('should display 2 products cards', () => {
    const products = server.createList('product', 2);

    act(() => products.forEach((product) => addProduct(product)));

    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
});
