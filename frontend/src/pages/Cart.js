import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      {/* Cream header area with logo */}
      <div className="cart-header-banner">
        {/* Logo SVG */}
        <svg width="100" height="80" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="40" r="36" fill="#C9973A" stroke="#3B1F0A" strokeWidth="2"/>
          <text x="50" y="35" textAnchor="middle" fill="#3B1F0A" fontSize="10" fontWeight="bold" fontFamily="serif">Dough</text>
          <text x="50" y="47" textAnchor="middle" fill="#3B1F0A" fontSize="10" fontWeight="bold" fontFamily="serif">Re Mi</text>
          <text x="50" y="58" textAnchor="middle" fill="#3B1F0A" fontSize="9" fontFamily="serif">🎵</text>
        </svg>

        {/* Wavy transition into dark section */}
        <svg
          viewBox="0 0 480 50"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%', marginTop: 8 }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L0,20 Q80,0 160,25 Q240,50 320,20 Q400,0 480,25 L480,50 Z"
            fill="#3B1F0A"
          />
        </svg>
      </div>

      {/* Dark cart section */}
      <div className="cart-dark-section" style={{ marginTop: -2 }}>
        <h2 className="cart-title">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="empty-state" style={{ color: '#f5deb3' }}>
            <div className="empty-icon">🛒</div>
            <h3 style={{ color: '#C9973A' }}>Your cart is empty</h3>
            <p>Add some delicious treats!</p>
            <button
              className="btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => navigate('/cakes')}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            {cart.map((item) => (
              <div key={item._id} className="cart-item-row">
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-qty-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                  <span className="cart-item-qty">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <span className="cart-item-price">{item.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{ background: 'none', border: 'none', color: '#ff7070', fontSize: '1rem', cursor: 'pointer', marginLeft: 6 }}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="cart-total-row">
              <span style={{ fontWeight: 800 }}>TOTAL</span>
              <span style={{ fontWeight: 800 }}>{cartCount}</span>
              <span style={{ fontWeight: 800 }}>₹{cartTotal}</span>
            </div>

            {/* Buttons */}
            <div className="cart-actions">
              <button className="btn-back" onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="btn-proceed" onClick={() => navigate('/checkout')}>
                Proceed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
