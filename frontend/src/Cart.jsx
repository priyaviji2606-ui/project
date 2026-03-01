import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // 🗑 Remove Item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ➕ Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ➖ Decrease Quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 💰 Total Calculation
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🚚 Place Order
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    localStorage.removeItem("cart");
    navigate("/delivery");
  };

  // 🧹 Clear Cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="min-h-screen bg-white pt-28 px-10">
      <h1 className="text-4xl font-bold text-emerald-600 mb-10">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          🛒 Your cart is empty
        </div>
      ) : (
        <div className="space-y-6">

          {/* 🧾 Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-black">
                  {item.name}
                </h3>

                <p className="text-gray-600">
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2 space-x-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-black mt-2">
                  ₹{item.price * item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* 💰 Total Section */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold text-black">
              Total
            </h3>
            <h3 className="text-xl font-bold text-emerald-600">
              ₹{total}
            </h3>
          </div>

          {/* 🚚 Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition"
            >
              Place Order 🚚
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;