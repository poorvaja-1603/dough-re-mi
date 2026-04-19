import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, user } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#C9973A" stroke="#3B1F0A" strokeWidth="2"/>
          <text x="26" y="22" textAnchor="middle" fill="#3B1F0A" fontSize="8" fontWeight="bold" fontFamily="serif">Dough</text>
          <text x="26" y="32" textAnchor="middle" fill="#3B1F0A" fontSize="8" fontWeight="bold" fontFamily="serif">Re Mi</text>
          <text x="26" y="40" textAnchor="middle" fill="#3B1F0A" fontSize="6" fontFamily="serif">🎵</text>
        </svg>
      </Link>

      {/* Nav links */}
      <ul className="navbar-links">
        <li><NavLink to="/cakes">Cakes</NavLink></li>
        <li><NavLink to="/bakery">Bakery</NavLink></li>
        <li><NavLink to="/cookies">Cookies</NavLink></li>
        <li><NavLink to="/about-us">About us</NavLink></li>
      </ul>

      {/* Icons */}
      <div className="navbar-icons">
        <Link to={user ? '/my-account' : '/login'} title="Account">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </Link>
        <Link to="/cart" title="Cart" style={{ position: 'relative' }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
