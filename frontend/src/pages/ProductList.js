import React, { useEffect, useState } from 'react';
import API from '../api';
import { useCart } from '../context/CartContext';

// Per-product calorie & allergen data keyed by name
const PRODUCT_META = {
  'Strawberry CheeseCake':   { calories: 420, allergens: 'Milk, Eggs, Gluten, Soy' },
  'Biscoff CheeseCake':      { calories: 460, allergens: 'Milk, Eggs, Gluten, Soy' },
  'Black Forest Cake':       { calories: 390, allergens: 'Milk, Eggs, Gluten' },
  'Chocolate Truffle Cake':  { calories: 480, allergens: 'Milk, Eggs, Gluten, Soy' },
  'Red Velvet Cake':         { calories: 410, allergens: 'Milk, Eggs, Gluten' },
  'Blueberry Cheesecake':    { calories: 380, allergens: 'Milk, Eggs, Gluten' },
  'Baguette':                { calories: 180, allergens: 'Gluten' },
  'ChocoChip Muffin':        { calories: 320, allergens: 'Milk, Eggs, Gluten, Soy' },
  'Pretzel':                 { calories: 210, allergens: 'Gluten' },
  'Croissant':               { calories: 290, allergens: 'Milk, Eggs, Gluten' },
  'Garlic Bread':            { calories: 240, allergens: 'Milk, Gluten' },
  'Blueberry Muffin':        { calories: 300, allergens: 'Milk, Eggs, Gluten' },
  'ChocolateChip Cookie':    { calories: 180, allergens: 'Milk, Eggs, Gluten, Soy' },
  'OatMeal Raisin Cookie':   { calories: 160, allergens: 'Milk, Eggs, Gluten, Oats' },
  'Peanut Butter Cookie':    { calories: 195, allergens: 'Milk, Eggs, Gluten, Peanuts' },
  'Sugar Cookies':           { calories: 140, allergens: 'Milk, Eggs, Gluten' },
  'Double Chocolate Cookie': { calories: 210, allergens: 'Milk, Eggs, Gluten, Soy' },
  'Macarons Box (6pcs)':     { calories: 390, allergens: 'Milk, Eggs, Tree Nuts' },
  'Chocolate Brownie':       { calories: 350, allergens: 'Milk, Eggs, Gluten, Soy' },
};

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
      {products.map((product) => {
        const meta = PRODUCT_META[product.name] || { calories: '—', allergens: '—' };
        return (
          <div key={product._id} className="product-card">
            {/* Left: image */}
            <img src={product.image} alt={product.name} />

            {/* Middle: info */}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta-row">
                <span className="product-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#C9973A" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle', marginRight:4}}>
                    <path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-5-5-11-5-11zM9 15a3 3 0 006 0c0-3-3-7-3-7S9 12 9 15z"/>
                  </svg>
                  <strong>{meta.calories}</strong> kcal
                </span>
                <span className="product-meta-divider">·</span>
                <span className="product-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9973A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle', marginRight:4}}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <strong>Allergens:</strong> {meta.allergens}
                </span>
              </div>
            </div>

            {/* Right: price + CTA */}
            <div className="product-action">
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
        );
      })}

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
