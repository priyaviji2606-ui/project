import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Small helper component for the Status labels
const Tag = ({ label, bg, color }) => (
  <span
    style={{
      background: bg,
      color: color,
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "bold",
      textTransform: "uppercase",
    }}
  >
    {label}
  </span>
);

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id || storedUser?._id;

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const orderRes = await axios.get(`http://localhost:5000/api/order/user-orders/${ userId }`);
        // Ensure we are setting an array even if the backend returns null
        setOrders(orderRes.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [navigate]);

  if (loading) {
    return <div style={{ padding: 30, textAlign: "center" }}>Loading your orders...</div>;
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: 30,
        borderRadius: 24,
        border: "1px solid #eee",
        alignSelf: "stretch",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <h3 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Recent Orders</h3>
        <span
          style={{
            fontSize: 12,
            color: "#aaa",
            background: "#f8f9fa",
            padding: "4px 12px",
            borderRadius: 20,
          }}
        >
          {orders.length} Records
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #f8f9fa" }}>
              <th style={{ padding: "12px 8px", fontSize: 11, color: "#bbb" }}>ORDER ID</th>
              <th style={{ padding: "12px 8px", fontSize: 11, color: "#bbb" }}>DATE</th>
              <th style={{ padding: "12px 8px", fontSize: 11, color: "#bbb" }}>STATUS</th>
              <th style={{ padding: "12px 8px", fontSize: 11, color: "#bbb" }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: "1px solid #fcfcfc" }}>
                  <td
                    style={{
                      padding: "15px 8px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#1a1a2e",
                    }}
                  >
                    #{order._id.slice(-5).toUpperCase()}
                  </td>
                  <td style={{ padding: "15px 8px", fontSize: 12, color: "#666" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "15px 8px" }}>
                    <Tag
                      label={order.status}
                      bg={order.status === "Delivered" ? "#e8f5e9" : "#fff8e1"}
                      color={order.status === "Delivered" ? "#2d6a4f" : "#f57c00"}
                    />
                  </td>
                  <td style={{ padding: "15px 8px", fontSize: 13, fontWeight: 800 }}>
                    ${order.total?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "60px 0",
                    color: "#ccc",
                    fontSize: "14px",
                  }}
                >
                  No order history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};