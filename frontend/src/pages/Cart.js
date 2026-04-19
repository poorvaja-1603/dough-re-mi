import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>{cartCount} {cartCount === 1 ? 'item' : 'items'} ready for checkout</p>
        
        {/* Wavy transition */}
        <svg
          viewBox="0 0 480 50"
          xmlns="http://www.w3.org/2000/svg"
          className="cart-wave"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L0,25 Q20,5 40,25 Q60,45 80,25 Q100,5 120,25 Q140,45 160,25 Q180,5 200,25 Q220,45 240,25 Q260,5 280,25 Q300,45 320,25 Q340,5 360,25 Q380,45 400,25 Q420,5 440,25 Q460,45 480,25 L480,50 Z"
            fill="var(--cream)"
          />
        </svg>
      </div>

      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-visual">🛒</div>
            <h2>Your cart is hungry!</h2>
            <p>Fill it with our delicious handcrafted treats.</p>
            <button className="btn-primary" onClick={() => navigate('/cakes')}>
              Go to Shop
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item._id} className="cart-item-card">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price-each">₹{item.price} each</p>
                    <div className="cart-item-actions">
                      <div className="qty-picker">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-label">FREE</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button className="btn-checkout" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <button className="btn-continue" onClick={() => navigate('/cakes')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
