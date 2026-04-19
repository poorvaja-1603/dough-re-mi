import React, { useEffect, useState } from "react";
import API from "../../api";

const STATUS_OPTIONS = [
  "placed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const STATUS_COLORS = {
  placed: "#C9973A",
  preparing: "#e67e22",
  out_for_delivery: "#2980b9",
  delivered: "#27ae60",
  cancelled: "#e74c3c",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const adminToken = () => {
    const admin = JSON.parse(localStorage.getItem("drm_admin") || "null");
    return admin?.token || "";
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/orders/all", {
        headers: { Authorization: `Bearer ${adminToken()}` },
      });
      setOrders(res.data);
    } catch {
      setMsg("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.patch(
        `/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${adminToken()}` } },
      );
      setMsg(`✅ Order status updated to "${newStatus}"`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: newStatus } : o,
        ),
      );
      setTimeout(() => setMsg(""), 3000);
    } catch {
      setMsg("Failed to update status.");
    }
  };

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filterStatus);

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">📦 Orders</h1>
        <button className="admin-btn-secondary" onClick={fetchOrders}>
          ↻ Refresh
        </button>
      </div>

      {/* Stats row */}
      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <p className="admin-stat-label">Total Orders</p>
          <p className="admin-stat-value">{orders.length}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Revenue (Paid)</p>
          <p className="admin-stat-value">₹{totalRevenue}</p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Delivered</p>
          <p className="admin-stat-value">
            {orders.filter((o) => o.orderStatus === "delivered").length}
          </p>
        </div>
        <div className="admin-stat-card">
          <p className="admin-stat-label">Pending</p>
          <p className="admin-stat-value">
            {
              orders.filter(
                (o) =>
                  o.orderStatus !== "delivered" &&
                  o.orderStatus !== "cancelled",
              ).length
            }
          </p>
        </div>
      </div>

      {msg && <div className="admin-msg">{msg}</div>}

      {/* Filter tabs */}
      <div className="admin-filter-tabs">
        {["all", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            className={`admin-filter-tab ${filterStatus === s ? "active" : ""}`}
            onClick={() => setFilterStatus(s)}
          >
            {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="loading-spinner">Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders found</h3>
        </div>
      ) : (
        <div className="admin-orders-list">
          {filtered.map((order) => (
            <div key={order._id} className="admin-order-card">
              {/* Order header */}
              <div className="admin-order-header">
                <div>
                  <span className="admin-order-id">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span
                    className="admin-status-badge"
                    style={{ background: STATUS_COLORS[order.orderStatus] }}
                  >
                    {order.orderStatus.replace(/_/g, " ")}
                  </span>
                  <span
                    className={`admin-payment-badge ${order.paymentStatus === "paid" ? "paid" : "pending"}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <span className="admin-order-date">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Customer info */}
              <div className="admin-order-customer">
                <span>👤 {order.user?.name || "Unknown"}</span>
                <span>✉️ {order.user?.email || "—"}</span>
              </div>

              {/* Items */}
              <div className="admin-order-items">
                {order.items.map((item, i) => (
                  <span key={i} className="admin-order-item-tag">
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>

              {/* Footer: total + status update */}
              <div className="admin-order-footer">
                <span className="admin-order-total">
                  Total: ₹{order.totalAmount}
                </span>
                <div className="admin-status-select-wrap">
                  <label>Update Status:</label>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="admin-status-select"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
