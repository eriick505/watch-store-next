import { useEffect, useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';

import Search from '../components/Search';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [term, setTerm] = useState('');
  const [localProducts, setLocalProducts] = useState([]);

  const { products, error } = useFetchProducts();

  useEffect(() => {
    if (term === '') return setLocalProducts(products);

    const productContainsTerm = ({ title }) =>
      title.toLowerCase().includes(term.toLocaleLowerCase());

    const productsFiltered = products.filter(productContainsTerm);

    setLocalProducts(productsFiltered);
  }, [products, term]);

  const doSearch = (term) => setTerm(term);

  const renderProductQuantity = () =>
    localProducts.length === 1 ? '1 Product' : `${localProducts.length} Products`;

  const renderErrorMessage = () => {
    if (!error) return null;
    /* istanbul ignore next */
    return <h4 data-testid="server-error">Server is down</h4>;
  };

  const renderProductListOrMessage = () => {
    const isNoTContainsProduct = localProducts.length === 0 && !error;

    if (isNoTContainsProduct) return <h4 data-testid="no-products">No products</h4>;

    return localProducts.map((prod) => <ProductCard key={prod.id} product={prod} />);
  };

  return (
    <main data-testid="product-list" className="my-8">
      <Search doSearch={doSearch} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">{renderProductQuantity()}</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}
          {renderProductListOrMessage()}
        </div>
      </div>
    </main>
  );
}
