import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import HealthForm from "./HealthForm";
import { OrderHistory } from "./OrderHistory";
import { DailyIntake } from "./DailyIntake";
import Profile from "./Profile";

// --- HELPERS ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] text-white rounded-xl p-3 text-xs shadow-xl border-none">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-[#52b788] m-0">{payload[0].value} kcal</p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Wrapped in useCallback so it can be passed to child components like HealthForm
  const fetchData = useCallback(async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || storedUser?._id;

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const [userRes, recRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/user/get-health/${userId}`),
        axios.post("http://localhost:5000/api/recommend", { userId }),
      ]);
      setUser(userRes.data.user);
      setRecommendations(recRes.data);
      setError(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#f8f9fa] font-bold text-emerald-600">
      <div className="animate-pulse">Syncing Suite...</div>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-red-500 mb-4 font-bold">Failed to load health data.</p>
      <button onClick={fetchData} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold">Retry</button>
    </div>
  );

  const macroPieData = [
    { name: "Protein", value: recommendations?.protein || 30, color: "#52b788" },
    { name: "Carbs", value: recommendations?.carbs || 135, color: "#f4a261" },
    { name: "Fats", value: recommendations?.fats || 45, color: "#e9c46a" },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-['DM_Sans']">
      {/* Global Sidebar / Nav Logic */}
      <div className="flex">
        <aside className="w-[300px] bg-white border-r border-gray-100 p-10 sticky flex flex-col gap-2 h-[calc(100vh-70px)] top-[70px]">
          <div className="pb-8 px-2">
            <h2 className="text-xl font-extrabold m-0">Healthly</h2>
            <p className="text-[12px] text-gray-400">Track your vitals</p>
          </div>

          <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon="📊" label="Main Dashboard" />
          <NavButton active={activeTab === "intake"} onClick={() => setActiveTab("intake")} icon="🍲" label="Daily Intake" />
          <NavButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon="👤" label="My Profile" />
          <NavButton active={activeTab === "orderHistory"} onClick={() => setActiveTab("orderHistory")} icon="📜" label="Order History" />

          <div className="mt-auto pt-5 border-t border-gray-50 px-2">
            <p className="text-[11px] font-black text-gray-300 uppercase">Logged in as</p>
            <p className="text-[13px] font-bold">{user?.name}</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-10 max-w-7xl mx-auto">
          {activeTab === "dashboard" && (
            <section className="animate-in fade-in duration-500">
              <header className="mb-8">
                <h1 className="text-2xl font-extrabold m-0">Vitals Overview</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Based on your BMI of {user?.bmi} <span className="text-emerald-500 font-bold">({user?.bmiCategory})</span>
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Weekly Activity */}
                <div className="lg:col-span-2 bg-white p-6 rounded-[24px] border border-gray-50 shadow-sm">
                  <h3 className="text-sm font-extrabold mb-5">Weekly Activity</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={dummyWeeklyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: "#f8f9fa" }} content={<CustomTooltip />} />
                      <Bar dataKey="calories" fill="#52b788" radius={6} barSize={35} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Macro Card */}
                <div className="bg-[#1a1a2e] p-6 rounded-[24px] text-white">
                  <h3 className="text-sm font-extrabold mb-5">Macro Targets</h3>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={macroPieData} innerRadius={35} outerRadius={50} dataKey="value" paddingAngle={5}>
                          {macroPieData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                    {macroPieData.map((m, i) => (
                      <div key={i}>
                        <p className="text-[9px] text-gray-500 font-black uppercase m-0">{m.name}</p>
                        <p className="text-sm font-bold m-0">{m.value}g</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-extrabold">Recommended for Your Goal</h3>
                <button className="text-xs text-emerald-500 font-bold hover:underline">View All Suggestions</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {recommendations?.recommendations?.map((food, i) => (
                  <FoodCard key={i} food={food} />
                ))}
              </div>
            </section>
          )}

          {activeTab === "intake" && <DailyIntake />}
          {activeTab === "profile" && <Profile />}
          
          {/* {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 space-y-6">
                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 text-center shadow-sm">
                        <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700/60">Current BMI</p>
                        <h2 className="my-4 text-7xl font-black text-emerald-800">{user?.bmi || "--"}</h2>
                        <span className="bg-white px-4 py-1 rounded-full text-xs font-black text-emerald-600 shadow-sm">{user?.bmiCategory}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Update Your Vitals</h3>
                    <HealthForm onUpdate={fetchData} /> 
                  </div>
               </div>
            </div>
          )} */}
          
          {activeTab === "orderHistory" && <OrderHistory />}
        </main>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all w-full text-left ${
        active ? "bg-[#f0faf5] text-[#52b788] font-extrabold" : "bg-transparent text-[#1a1a2e] font-medium hover:bg-gray-50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function FoodCard({ food }) {
  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes("chicken") || n.includes("meat")) return "🍗";
    if (n.includes("salad") || n.includes("veg")) return "🥗";
    if (n.includes("fish")) return "🐟";
    return "🍱";
  };

  return (
    <div className="bg-white p-5 rounded-[20px] border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 cursor-pointer">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
        {getIcon(food.name)}
      </div>
      <div className="flex-1">
        <h4 className="m-0 text-[15px] font-bold text-[#1a1a2e]">{food.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-emerald-500 font-extrabold">{food.calories} kcal</span>
          <span className="text-gray-300 text-[10px]">•</span>
          <span className="text-xs text-gray-400">{food.protein}g Protein</span>
        </div>
      </div>
      <div className="text-gray-200 text-lg">→</div>
    </div>
  );
}

const dummyWeeklyData = [
  { day: "Mon", calories: 1800 }, { day: "Tue", calories: 2100 },
  { day: "Wed", calories: 1900 }, { day: "Thu", calories: 2200 },
  { day: "Fri", calories: 2000 }, { day: "Sat", calories: 2300 },
  { day: "Sun", calories: 1700 },
];

export default Dashboard;