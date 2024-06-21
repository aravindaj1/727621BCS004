import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://20.244.56.144/test/companies/A2/categories/Laptop/products/top-10',
          {
            params: {
              minPrice: 1,
              maxPrice: 10000
            }
          }
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Top 10 Laptops</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
