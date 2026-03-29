import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add this!

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [removing, setRemoving] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const sync = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    setRemoving(id);
    setTimeout(() => {
      sync(cartItems.filter((item) => item.id !== id));
      setRemoving(null);
    }, 280);
  };

  const increaseQty = (id) =>
    sync(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const decreaseQty = (id) =>
    sync(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

  const clearCart = () => sync([]);

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    setCheckingOut(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || storedUser?._id;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/place",
        {
          userId,
          items: cartItems,
          subtotal,
          deliveryFee: delivery,
          total,
        },
      );

      if (response.data.success) {
        localStorage.removeItem("cart");
        // Pass the orderId to the delivery page
        navigate(`/delivery/${response.data.orderId}`);
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Could not place order. Please try again.");
      setCheckingOut(false);
    }
  };
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = 49;
  const total = subtotal + (subtotal > 0 ? delivery : 0);
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        paddingTop: 66,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeOut { to { opacity: 0; transform: translateX(16px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
          padding: "40px 60px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(82,183,136,0.07)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#52b788",
            marginBottom: 10,
          }}
        >
          Your Order
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 900,
            color: "#fff",
            marginBottom: 6,
          }}
        >
          Cart{" "}
          {totalItems > 0 && (
            <span style={{ fontSize: 20, color: "#52b788" }}>
              ({totalItems} item{totalItems !== 1 ? "s" : ""})
            </span>
          )}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
          Review your items and proceed to checkout.
        </p>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 60px 72px" }}
      >
        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              animation: "fadeIn 0.4s ease",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#1a1a2e",
                marginBottom: 10,
              }}
            >
              Your cart is empty
            </h2>
            <p style={{ color: "#aaa", fontSize: 15, marginBottom: 32 }}>
              Add some nutritious meals to get started.
            </p>
            <button
              onClick={() => navigate("/menu")}
              style={{
                background: "#1a1a2e",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "13px 32px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: 28,
              alignItems: "start",
            }}
          >
            {/* ── Left: Items ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: "20px 24px",
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    animation:
                      removing === item.id
                        ? "fadeOut 0.28s ease forwards"
                        : "fadeIn 0.35s ease",
                  }}
                >
                  {/* Item image */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 14,
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#f5f5f5",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&fit=crop";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#1a1a2e",
                        marginBottom: 4,
                      }}
                    >
                      {item.name}
                    </h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 11,
                          background: "#e8f5e9",
                          color: "#2d6a4f",
                          borderRadius: 99,
                          padding: "2px 8px",
                          fontWeight: 700,
                        }}
                      >
                        {item.calories} kcal
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          background: "#f0f0f0",
                          color: "#888",
                          borderRadius: 99,
                          padding: "2px 8px",
                          fontWeight: 600,
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Qty stepper */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0,
                      border: "1.5px solid #ebebeb",
                      borderRadius: 10,
                      overflow: "hidden",
                      background: "#fafafa",
                    }}
                  >
                    <button
                      onClick={() => decreaseQty(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "8px 14px",
                        cursor: "pointer",
                        fontSize: 16,
                        color: "#555",
                        fontWeight: 700,
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: 28,
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#1a1a2e",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "8px 14px",
                        cursor: "pointer",
                        fontSize: 16,
                        color: "#555",
                        fontWeight: 700,
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: "right", minWidth: 80 }}>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#1a1a2e",
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </p>
                    <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>
                      ₹{item.price} each
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: "none",
                      border: "1.5px solid #fca5a5",
                      borderRadius: 10,
                      padding: "7px 10px",
                      cursor: "pointer",
                      color: "#c0392b",
                      fontSize: 16,
                      transition: "all 0.18s ease",
                      lineHeight: 1,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#fde8e8";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "none";
                    }}
                    title="Remove item"
                  >
                    🗑
                  </button>
                </div>
              ))}

              {/* Clear cart */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 4,
                }}
              >
                <button
                  onClick={clearCart}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#bbb",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "underline",
                  }}
                >
                  Clear all items
                </button>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "28px",
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                position: "sticky",
                top: 86,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  marginBottom: 24,
                }}
              >
                Order Summary
              </h2>

              {/* Line items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#777" }}>
                      {item.name}{" "}
                      <span style={{ color: "#ccc" }}>×{item.quantity}</span>
                    </span>
                    <span style={{ fontWeight: 700, color: "#1a1a2e" }}>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{ height: 1, background: "#f0f0f0", marginBottom: 16 }}
              />

              {/* Subtotal / Delivery */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#888" }}>Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#1a1a2e" }}>
                    ₹{subtotal}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#888" }}>Delivery Fee</span>
                  <span style={{ fontWeight: 700, color: "#1a1a2e" }}>
                    ₹{delivery}
                  </span>
                </div>
              </div>

              <div
                style={{ height: 1, background: "#f0f0f0", marginBottom: 20 }}
              />

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}
                >
                  Total
                </span>
                <span
                  style={{ fontSize: 22, fontWeight: 900, color: "#2d6a4f" }}
                >
                  ₹{total}
                </span>
              </div>

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                style={{
                  width: "100%",
                  background: checkingOut ? "#a8d5bc" : "#1a1a2e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 13,
                  padding: "15px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: checkingOut ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                  transition: "background 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  if (!checkingOut) e.target.style.background = "#2d6a4f";
                }}
                onMouseLeave={(e) => {
                  if (!checkingOut) e.target.style.background = "#1a1a2e";
                }}
              >
                {checkingOut ? (
                  <>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Processing…
                  </>
                ) : (
                  "Place Order 🚚"
                )}
              </button>

              {/* Trust badge */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "#ccc",
                  marginTop: 16,
                }}
              >
                🔒 Secure checkout · Free returns
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Cart;
