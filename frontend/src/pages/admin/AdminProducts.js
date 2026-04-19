import React, { useEffect, useState } from "react";
import API from "../../api";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "cakes",
  image: "",
  isBestSeller: false,
  bestSellerRank: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  // Use admin token for requests
  const adminToken = () => {
    const admin = JSON.parse(localStorage.getItem("drm_admin") || "null");
    return admin?.token || "";
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch {
      setMsg("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      isBestSeller: product.isBestSeller,
      bestSellerRank: product.bestSellerRank || "",
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image) {
      setMsg("Name, price and image are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bestSellerRank: form.bestSellerRank
          ? Number(form.bestSellerRank)
          : null,
      };
      if (editingId) {
        await API.put(`/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        setMsg("✅ Product updated!");
      } else {
        await API.post("/products", payload, {
          headers: { Authorization: `Bearer ${adminToken()}` },
        });
        setMsg("✅ Product added!");
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setMsg(err.response?.data?.message || "Error saving product.");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${adminToken()}` },
      });
      setMsg("🗑️ Product deleted.");
      fetchProducts();
      setTimeout(() => setMsg(""), 3000);
    } catch {
      setMsg("Error deleting product.");
    }
  };

  const filtered =
    filterCat === "all"
      ? products
      : products.filter((p) => p.category === filterCat);

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">🍰 Products</h1>
        <button className="admin-btn-primary" onClick={openAdd}>
          + Add Product
        </button>
      </div>

      {msg && <div className="admin-msg">{msg}</div>}

      {/* Category filter tabs */}
      <div className="admin-filter-tabs">
        {["all", "cakes", "bakery", "cookies"].map((cat) => (
          <button
            key={cat}
            className={`admin-filter-tab ${filterCat === cat ? "active" : ""}`}
            onClick={() => setFilterCat(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="admin-form-card">
          <h3 className="admin-form-title">
            {editingId ? "Edit Product" : "Add New Product"}
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
              />
            </div>
            <div className="admin-form-group">
              <label>Price (₹) *</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="299"
              />
            </div>
            <div className="admin-form-group">
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="cakes">Cakes</option>
                <option value="bakery">Bakery</option>
                <option value="cookies">Cookies</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Image URL *</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Product description..."
              />
            </div>
            <div className="admin-form-group admin-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={form.isBestSeller}
                  onChange={handleChange}
                />
                &nbsp; Mark as Bestseller
              </label>
            </div>
            {form.isBestSeller && (
              <div className="admin-form-group">
                <label>Bestseller Rank (1, 2, 3...)</label>
                <input
                  name="bestSellerRank"
                  type="number"
                  value={form.bestSellerRank}
                  onChange={handleChange}
                  placeholder="1"
                />
              </div>
            )}
          </div>
          <div className="admin-form-actions">
            <button
              className="admin-btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
            </button>
            <button
              className="admin-btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Bestseller</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="admin-product-thumb"
                    />
                  </td>
                  <td className="admin-product-name">{product.name}</td>
                  <td>
                    <span
                      className={`admin-cat-badge admin-cat-${product.category}`}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td className="admin-price">₹{product.price}</td>
                  <td>
                    {product.isBestSeller
                      ? `⭐ #${product.bestSellerRank}`
                      : "—"}
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <button
                        className="admin-btn-edit"
                        onClick={() => openEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-btn-delete"
                        onClick={() => handleDelete(product._id, product.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🍰</div>
              <h3>No products found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
