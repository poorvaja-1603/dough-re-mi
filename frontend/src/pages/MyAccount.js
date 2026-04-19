import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MyAccount() {
  const { user, logout } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const firstLetter = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="account-page">
      <div className="account-card">
        {/* Avatar */}
        {user?.profilePic ? (
          <img src={user.profilePic} alt="avatar" className="account-avatar" />
        ) : (
          <div className="account-avatar-placeholder">{firstLetter}</div>
        )}

        {/* Greeting */}
        <p className="account-name">Hi {user?.name?.split(' ')[0].toUpperCase()}!</p>
        <p className="account-subtitle">Welcome back to Dough‑Re‑Mi</p>

        {/* 2×2 grid of options */}
        <div className="account-grid">
          <button className="account-btn" onClick={() => navigate('/my-orders')}>
            My orders
          </button>
          <button className="account-btn" onClick={() => navigate('/cart')}>
            My Cart
          </button>
          <button className="account-btn" onClick={() => navigate('/saved-addresses')}>
            Saved addresses
          </button>
          <button className="account-btn" onClick={() => navigate('/checkout')}>
            Payment
          </button>
          <button className="account-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
