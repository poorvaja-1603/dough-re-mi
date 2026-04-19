import React, { useEffect, useState } from 'react';
import API from '../api';
import { useCart } from '../context/CartContext';

export default function ProductList({ category, title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    setLoading(true);
    API.get(`/products?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  const isInCart = (id) => cart.some((item) => item._id === id);

  if (loading) return <div className="loading-spinner">Loading {title}...</div>;

  return (
    <div className="product-list-page">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-footer">
              <span className="price-badge">₹{product.price}</span>
              <button
                className={`btn-add-cart ${isInCart(product._id) ? 'added' : ''}`}
                onClick={() => addToCart(product)}
              >
                {isInCart(product._id) ? '✓ Added' : (
                  <>
                    Add to{' '}
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🍰</div>
          <h3>No products found</h3>
          <p>Check back soon!</p>
        </div>
      )}
    </div>
  );
}
