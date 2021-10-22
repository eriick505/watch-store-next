import axios from 'axios';
import { useEffect, useState } from 'react';

export function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    axios
      .get('/api/products')
      .then(({ data }) => {
        if (mounted) setProducts(data.products);
      })
      .catch((err) => {
        if (mounted) setError(true);
      });

    return () => (mounted = false);
  }, []);

  return { products, error };
}
