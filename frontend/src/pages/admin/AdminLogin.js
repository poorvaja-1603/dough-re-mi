import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post("/auth/admin/login", form);
      localStorage.setItem("drm_admin", JSON.stringify(data));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-page"
      style={{ background: "#2a1505", minHeight: "100vh" }}
    >
      <div className="auth-card" style={{ border: "2px solid #C9973A" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ fontSize: "2.5rem" }}>🎵</span>
        </div>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>
        <p className="auth-sub">Dough Re Mi — Admin Panel</p>

        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@doughremi.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button className="btn-auth" onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

        <p className="auth-switch" style={{ marginTop: 16 }}>
          <a href="/" style={{ color: "#C9973A" }}>
            ← Back to Store
          </a>
        </p>
      </div>
    </div>
  );
}
