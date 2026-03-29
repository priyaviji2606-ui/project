import React, { useState, useEffect } from "react";

// --- DATA ---
const foods = [
  { id: 1, name: "Grilled Chicken Breast", calories: 250, protein: 40, carbs: 5, fats: 8, price: 220, category: "Protein", image: "https://images.pexels.com/photos/2641887/pexels-photo-2641887.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 2, name: "Brown Rice Bowl", calories: 200, protein: 5, carbs: 45, fats: 2, price: 120, category: "Carbs", image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 3, name: "Quinoa Salad", calories: 180, protein: 8, carbs: 30, fats: 4, price: 180, category: "Vegan", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 4, name: "Oats with Fruits", calories: 220, protein: 7, carbs: 40, fats: 5, price: 140, category: "Breakfast", image: "https://images.pexels.com/photos/1833336/pexels-photo-1833336.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 5, name: "Boiled Eggs", calories: 155, protein: 13, carbs: 1, fats: 11, price: 90, category: "Protein", image: "https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 6, name: "Paneer Tikka", calories: 260, protein: 18, carbs: 10, fats: 16, price: 210, category: "Vegetarian", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 7, name: "Avocado Toast", calories: 240, protein: 6, carbs: 28, fats: 12, price: 170, category: "Breakfast", image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 8, name: "Salmon Fillet", calories: 300, protein: 34, carbs: 0, fats: 20, price: 350, category: "Protein", image: "https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 14, name: "Protein Shake", calories: 190, protein: 25, carbs: 10, fats: 3, price: 190, category: "Protein", image: "https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" },
  { id: 15, name: "Tofu Stir Fry", calories: 240, protein: 18, carbs: 20, fats: 10, price: 210, category: "Vegan", image: "https://images.pexels.com/photos/5420961/pexels-photo-5420961.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" }
];

const categories = ["All", ...Array.from(new Set(foods.map(f => f.category)))];

// --- COMPONENTS ---

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 z-[9999]">
      <span className="text-emerald-400 text-xl">✓</span> 
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};

function MacroBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
        <span>{label}</span>
        <span className="text-slate-700">{value}g</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-700`} style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function FoodCard({ food, onAdd }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(food, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col">
      <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6">
        <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-700">
          {food.category}
        </div>
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">
          {food.calories} kcal
        </div>
      </div>

      <div className="px-2 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-slate-800 leading-tight">{food.name}</h3>
          <span className="text-xl font-black text-emerald-600">₹{food.price}</span>
        </div>

        <div className="space-y-3 mb-6">
          <MacroBar label="Protein" value={food.protein} max={50} color="#10b981" />
          <MacroBar label="Carbs" value={food.carbs} max={60} color="#f59e0b" />
          <MacroBar label="Fats" value={food.fats} max={30} color="#6366f1" />
        </div>

        <div className="flex gap-3 mt-auto">
          <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center font-bold text-slate-400 hover:text-slate-900">-</button>
            <span className="w-6 text-center text-sm font-bold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center font-bold text-slate-400 hover:text-slate-900">+</button>
          </div>
          <button 
            onClick={handleAdd}
            className={`flex-1 rounded-2xl py-3 font-bold text-sm transition-all shadow-lg ${added ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-200'}`}
          >
            {added ? "✓ Added" : "Add to Cart"}
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
    <div className="min-h-screen bg-slate-50 font-['DM_Sans'] pb-20">
      
      {/* Hero Header */}
      <div className="bg-slate-900 pt-16 pb-32 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Premium Selection</span>
          <h1 className="text-white text-5xl font-black mb-6 tracking-tight">NutriMenu</h1>
          <p className="text-slate-400 text-lg leading-relaxed">Precision-engineered meals for athletes and health enthusiasts.</p>
        </div>
      </div>

      {/* Interactive Controls Container */}
      <div className="max-w-7xl mx-auto px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
          
          {/* Category Scroller */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto flex-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search meals..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.length > 0 ? (
            filtered.map(food => (
              <FoodCard key={food.id} food={food} onAdd={handleAdd} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-bold">No meals found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      {/* Floating Cart Indicator (Mobile/Global) */}
      {cartCount > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-bounce">
          <span className="font-black text-sm uppercase tracking-widest">Cart Items</span>
          <span className="bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">{cartCount}</span>
        </div>
      )}
    </div>
  );
}

export default Menu;