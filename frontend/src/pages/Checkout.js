import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api';

export default function Checkout() {
  const { cart, cartTotal, clearCart, user, showToast } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!address.street || !address.pincode) {
      showToast('Please fill in your delivery address!');
      return;
    }
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        showToast('Razorpay failed to load. Check your internet connection.');
        setLoading(false);
        return;
      }

      // 2. Create Razorpay order on backend
      const { data: rzpOrder } = await API.post('/payment/create-order', {
        amount: cartTotal,
      });

      // 3. Open Razorpay checkout modal
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: rzpOrder.amount,
        currency: 'INR',
        name: 'Dough Re Mi',
        description: 'Freshly baked with love 🎵',
        order_id: rzpOrder.id,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#C9973A',
        },
        handler: async function (response) {
          // 4. Verify payment
          const { data: verifyData } = await API.post('/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyData.success) {
            // 5. Create order in DB
            const orderItems = cart.map((item) => ({
              product: item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            }));

            const { data: order } = await API.post('/orders', {
              items: orderItems,
              totalAmount: cartTotal,
              deliveryAddress: address,
              paymentMethod: 'razorpay',
              razorpayOrderId: response.razorpay_order_id,
            });

            // 6. Mark order as paid
            await API.patch(`/orders/${order._id}/pay`, {
              razorpayPaymentId: response.razorpay_payment_id,
            });

            clearCart();
            showToast('🎉 Order placed successfully!');
            navigate('/my-orders');
          } else {
            showToast('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            showToast('Payment cancelled.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        showToast('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      showToast('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Nothing to checkout</h3>
          <p>Your cart is empty!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* Order Summary */}
      <div className="checkout-section">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item._id} className="checkout-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="checkout-summary-item">
          <span>Total</span>
          <span>₹{cartTotal}</span>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <div className="form-group">
          <label>Street / Flat / Building</label>
          <input
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="e.g. Shop No. 12, Maple Plaza"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input name="city" value={address.city} onChange={handleChange} placeholder="Mumbai" />
        </div>
        <div className="form-group">
          <label>State</label>
          <input name="state" value={address.state} onChange={handleChange} placeholder="Maharashtra" />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input name="pincode" value={address.pincode} onChange={handleChange} placeholder="400053" maxLength={6} />
        </div>
      </div>

      {/* Pay button */}
      <button className="btn-pay" onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : `Pay ₹${cartTotal} via Razorpay`}
      </button>
    </div>
  );
}
