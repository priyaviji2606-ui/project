import React, { useState, useEffect } from "react";

const foods = [
  { id: 1, name: "Grilled Chicken", calories: 250, protein: 40, carbs: 5, fats: 8, price: 220 },
  { id: 2, name: "Brown Rice", calories: 200, protein: 5, carbs: 45, fats: 2, price: 120 },
  { id: 3, name: "Salad Bowl", calories: 150, protein: 5, carbs: 20, fats: 5, price: 150 }
];

function Menu() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const addToCart = (food) => {
    const quantity = quantities[food.id] || 1;
    const existingItem = cart.find(item => item.id === food.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...food, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item added successfully ✅");
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-10">

      <h2 className="text-4xl font-bold text-emerald-600 mb-10">
        Nutrition Menu
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-black">
              {food.name}
            </h3>

            <p className="mt-2 text-gray-600">{food.calories} kcal</p>
            <p className="font-semibold text-black">₹{food.price}</p>

            {/* Nutrition Info */}
            <div className="flex gap-3 mt-4 text-sm flex-wrap">
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                {food.protein}g Protein
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                {food.carbs}g Carbs
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                {food.fats}g Fats
              </span>
            </div>

            {/* Quantity */}
            <input
              type="number"
              min="1"
              value={quantities[food.id] || 1}
              onChange={(e) =>
                handleQuantityChange(food.id, parseInt(e.target.value))
              }
              className="w-full mt-5 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {/* Button */}
            <button
              onClick={() => addToCart(food)}
              className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;