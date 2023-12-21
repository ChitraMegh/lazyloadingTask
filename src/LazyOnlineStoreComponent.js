// src/LazyOnlineShoppingComponent.js
import React, { useState, useEffect, useCallback } from 'react';

const LazyOnlineShoppingComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateRandomData = () => {
    const newData = [];
    for (let i = 0; i < 10; i++) {
      newData.push({
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: `https://via.placeholder.com/300?text=Product${i + 1}`,
        name: `Product ${i + 1}`,
        price: (Math.random() * 100).toFixed(2),
      });
    }
    return newData;
  };

  const fetchProducts = useCallback(() => {
    setProducts(generateRandomData());
    setLoading(false);
  }, []);

  const loadMoreProducts = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts((prevProducts) => [...prevProducts, ...generateRandomData()]);
      setLoading(false);
    }, 1000); // Simulate delay for loading more data
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100 && !loading) {
      loadMoreProducts();
    }
  }, [loading, loadMoreProducts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h1>Online Shopping Store - Lazy Loading Component</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ margin: '20px', textAlign: 'center' }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LazyOnlineShoppingComponent;
