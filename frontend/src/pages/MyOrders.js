import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const STATUS_COLORS = {
  placed: '#C9973A',
  preparing: '#e67e22',
  out_for_delivery: '#2980b9',
  delivered: '#27ae60',
  cancelled: '#e74c3c',
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/orders/my')
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner">Loading your orders...</div>;

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Place your first order and it will show here!</p>
          <button
            className="btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => navigate('/cakes')}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
              <span
                className="order-status-badge"
                style={{ background: STATUS_COLORS[order.orderStatus] || '#C9973A', color: '#fff' }}
              >
                {order.orderStatus.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="order-items-list">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                </p>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="order-total">Total: ₹{order.totalAmount}</span>
              <span style={{ color: '#888', fontSize: '0.75rem' }}>
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
