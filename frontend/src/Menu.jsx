import React, { useState, useEffect } from "react";

const foods = [
  {
    id: 1,
    name: "Grilled Chicken Breast",
    calories: 250,
    protein: 40,
    carbs: 5,
    fats: 8,
    price: 220,
    category: "Protein",
    image: "https://images.pexels.com/photos/2641887/pexels-photo-2641887.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Brown Rice Bowl",
    calories: 200,
    protein: 5,
    carbs: 45,
    fats: 2,
    price: 120,
    category: "Carbs",
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Quinoa Salad",
    calories: 180,
    protein: 8,
    carbs: 30,
    fats: 4,
    price: 180,
    category: "Vegan",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Oats with Fruits",
    calories: 220,
    protein: 7,
    carbs: 40,
    fats: 5,
    price: 140,
    category: "Breakfast",
    image: "https://images.pexels.com/photos/1833336/pexels-photo-1833336.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Boiled Eggs",
    calories: 155,
    protein: 13,
    carbs: 1,
    fats: 11,
    price: 90,
    category: "Protein",
    image: "https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Paneer Tikka",
    calories: 260,
    protein: 18,
    carbs: 10,
    fats: 16,
    price: 210,
    category: "Vegetarian",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Avocado Toast",
    calories: 240,
    protein: 6,
    carbs: 28,
    fats: 12,
    price: 170,
    category: "Breakfast",
    image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Salmon Fillet",
    calories: 300,
    protein: 34,
    carbs: 0,
    fats: 20,
    price: 350,
    category: "Protein",
    image: "https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Sweet Potato Bowl",
    calories: 210,
    protein: 4,
    carbs: 45,
    fats: 1,
    price: 150,
    category: "Carbs",
    image: "https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Greek Yogurt",
    calories: 130,
    protein: 12,
    carbs: 6,
    fats: 5,
    price: 110,
    category: "Snack",
    image: "https://images.pexels.com/photos/1097946/pexels-photo-1097946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Fruit Mix Bowl",
    calories: 120,
    protein: 2,
    carbs: 30,
    fats: 1,
    price: 130,
    category: "Vegan",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 12,
    name: "Chicken Wrap",
    calories: 280,
    protein: 25,
    carbs: 30,
    fats: 9,
    price: 200,
    category: "Meal",
    image: "https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 13,
    name: "Veggie Sandwich",
    calories: 230,
    protein: 8,
    carbs: 35,
    fats: 6,
    price: 160,
    category: "Vegetarian",
    image: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 14,
    name: "Protein Shake",
    calories: 190,
    protein: 25,
    carbs: 10,
    fats: 3,
    price: 190,
    category: "Protein",
    image: "https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    id: 15,
    name: "Tofu Stir Fry",
    calories: 240,
    protein: 18,
    carbs: 20,
    fats: 10,
    price: 210,
    category: "Vegan",
    image: "https://images.pexels.com/photos/5420961/pexels-photo-5420961.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  }
];

const categories = ["All", ...Array.from(new Set(foods.map(f => f.category)))];

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      bottom: 32,
      right: 32,
      background: "#1a1a2e",
      color: "#fff",
      padding: "14px 24px",
      borderRadius: 12,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      fontSize: 15,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      display: "flex",
      alignItems: "center",
      gap: 10,
      zIndex: 9999,
      animation: "slideUp 0.3s ease"
    }}>
      <span style={{ fontSize: 20 }}>✅</span> {message}
    </div>
  );
};

function MacroBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#999", marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700, color: "#333" }}>{value}g</span>
      </div>
      <div style={{ height: 5, background: "#f0f0f0", borderRadius: 99 }}>
        <div style={{ height: 5, width: `${pct}%`, background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

function FoodCard({ food, onAdd }) {
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    onAdd(food, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.13)" : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #f0f0f0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#f5f5f5" }}>
        <img
          src={imgError
            ? "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
            : food.image}
          alt={food.name}
          onError={() => setImgError(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.4s ease"
          }}
        />
        <span style={{
          position: "absolute", top: 12, left: 12,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          color: "#2d6a4f",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: 99,
        }}>{food.category}</span>
        <span style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(26,26,46,0.82)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 99,
        }}>{food.calories} kcal</span>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.35, flex: 1 }}>{food.name}</h3>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#2d6a4f", marginLeft: 10, whiteSpace: "nowrap" }}>₹{food.price}</span>
        </div>

        {/* Macro bars */}
        <div style={{ marginBottom: 16 }}>
          <MacroBar label="Protein" value={food.protein} max={50} color="#52b788" />
          <MacroBar label="Carbs" value={food.carbs} max={60} color="#f4a261" />
          <MacroBar label="Fats" value={food.fats} max={30} color="#e9c46a" />
        </div>

        {/* Qty + Add */}
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <div style={{
            display: "flex", alignItems: "center",
            border: "1.5px solid #ebebeb", borderRadius: 10, overflow: "hidden", background: "#fafafa"
          }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ background: "none", border: "none", padding: "8px 13px", cursor: "pointer", fontSize: 17, color: "#555", fontWeight: 700, lineHeight: 1 }}
            >−</button>
            <span style={{ minWidth: 26, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              style={{ background: "none", border: "none", padding: "8px 13px", cursor: "pointer", fontSize: 17, color: "#555", fontWeight: 700, lineHeight: 1 }}
            >+</button>
          </div>
          <button
            onClick={handleAdd}
            style={{
              flex: 1,
              background: added ? "#52b788" : "#1a1a2e",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.02em",
              padding: "0 16px",
              transition: "background 0.2s ease",
              height: 42,
            }}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAdd = (food, quantity) => {
    const existingItem = cart.find(item => item.id === food.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [...cart, { ...food, quantity }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setToast(`${food.name} added to cart`);
  };

  const filtered = foods.filter(f => {
    const catMatch = activeCategory === "All" || f.category === activeCategory;
    const searchMatch = f.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        @keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:focus { outline: none; }
        input:focus { outline: none; }
      `}</style>

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #eeeeee",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 66, gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
            borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <span style={{ fontSize: 18 }}>🥗</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a1a2e", whiteSpace: "nowrap" }}>NutriMenu</span>
        </div>

        <div style={{ position: "relative", width: 260, flexShrink: 1 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#bbb" }}>🔍</span>
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "9px 14px 9px 36px",
              border: "1.5px solid #ececec", borderRadius: 12,
              fontSize: 14, color: "#333", background: "#fafafa",
              fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s"
            }}
            onFocus={e => e.target.style.borderColor = "#52b788"}
            onBlur={e => e.target.style.borderColor = "#ececec"}
          />
        </div>

        <button style={{
          background: "#1a1a2e", color: "#fff", border: "none",
          borderRadius: 12, padding: "9px 20px", cursor: "pointer",
          fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center",
          gap: 8, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif"
        }}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              background: "#52b788", color: "#fff",
              borderRadius: 99, padding: "2px 8px", fontSize: 12, fontWeight: 800
            }}>{cartCount}</span>
          )}
        </button>
      </header>

      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
        padding: "52px 40px 44px",
        color: "#fff",
      }}>
        <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#52b788", fontWeight: 800, marginBottom: 10 }}>
          Fuel Your Body Right
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, lineHeight: 1.18, marginBottom: 12, color: "#fff" }}>
          Nutrition Menu
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, maxWidth: 460, lineHeight: 1.65 }}>
          Handcrafted meals designed to fuel performance, support recovery, and taste extraordinary.
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{
        padding: "22px 40px 0",
        display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "7px 18px",
              borderRadius: 99,
              border: activeCategory === cat ? "none" : "1.5px solid #e4e4e4",
              background: activeCategory === cat ? "#1a1a2e" : "#fff",
              color: activeCategory === cat ? "#fff" : "#666",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.18s ease",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.01em",
            }}
          >{cat}</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#aaa", fontWeight: 500 }}>
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Grid */}
      <main style={{
        padding: "26px 40px 64px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
        gap: 22,
        maxWidth: 1380,
        margin: "0 auto",
      }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 0", color: "#bbb", fontSize: 17 }}>
            No items match your search
          </div>
        ) : (
          filtered.map(food => (
            <FoodCard key={food.id} food={food} onAdd={handleAdd} />
          ))
        )}
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Menu;