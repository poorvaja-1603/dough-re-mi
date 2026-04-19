import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("drm_admin") || "null");

  const handleLogout = () => {
    localStorage.removeItem("drm_admin");
    navigate("/admin/login");
  };

  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span style={{ fontSize: "1.8rem" }}>🎵</span>
          <div>
            <p className="admin-brand">Dough Re Mi</p>
            <p className="admin-role">Admin Panel</p>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard/products" className="admin-nav-link">
            Products
          </NavLink>
          <NavLink to="/admin/dashboard/orders" className="admin-nav-link">
            Orders
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <p className="admin-user-name">{admin.name}</p>
          <p className="admin-user-email">{admin.email}</p>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
