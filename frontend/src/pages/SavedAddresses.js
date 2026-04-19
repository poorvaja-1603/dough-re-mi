import React, { useEffect, useState } from 'react';
import API from '../api';
import { useCart } from '../context/CartContext';

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: '', street: '', city: '', state: '', pincode: '' });
  const { showToast } = useCart();

  useEffect(() => {
    API.get('/users/profile').then((res) => setAddresses(res.data.savedAddresses || []));
  }, []);

  const handleAdd = async () => {
    if (!form.street || !form.pincode) {
      showToast('Please fill street and pincode!');
      return;
    }
    try {
      const res = await API.post('/users/addresses', form);
      setAddresses(res.data);
      setForm({ label: '', street: '', city: '', state: '', pincode: '' });
      setShowForm(false);
      showToast('Address saved!');
    } catch {
      showToast('Error saving address.');
    }
  };

  const handleDelete = async (index) => {
    try {
      const res = await API.delete(`/users/addresses/${index}`);
      setAddresses(res.data);
      showToast('Address removed.');
    } catch {
      showToast('Error removing address.');
    }
  };

  return (
    <div className="addresses-page">
      <h2>Saved Addresses</h2>

      {addresses.length === 0 && !showForm && (
        <div className="empty-state">
          <div className="empty-icon">📍</div>
          <h3>No saved addresses</h3>
          <p>Add your delivery address below</p>
        </div>
      )}

      {addresses.map((addr, i) => (
        <div key={i} className="address-card">
          <div>
            {addr.label && <p className="label">{addr.label}</p>}
            <p>{addr.street}, {addr.city}</p>
            <p>{addr.state} – {addr.pincode}</p>
          </div>
          <button className="btn-delete" onClick={() => handleDelete(i)}>Remove</button>
        </div>
      ))}

      {showForm ? (
        <div className="add-address-form">
          <h3>New Address</h3>
          {['label', 'street', 'city', 'state', 'pincode'].map((field) => (
            <div className="form-group" key={field}>
              <label style={{ textTransform: 'capitalize' }}>{field}</label>
              <input
                value={form[field]}
                onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                placeholder={field === 'label' ? 'Home / Work (optional)' : ''}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn-auth" onClick={handleAdd}>Save Address</button>
            <button
              className="btn-back"
              style={{ flex: 1 }}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="btn-primary"
          style={{ marginTop: 16, width: '100%', padding: '14px' }}
          onClick={() => setShowForm(true)}
        >
          + Add New Address
        </button>
      )}
    </div>
  );
}
