import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
// In Profile/Dashboard component
const getRecommendations = async () => {
  const response = await fetch('http://localhost:5000/api/recommend/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      protein_goal: 100,
      carbs_goal: 200
    })
  });
  const data = await response.json();
  console.log('AI Recommendations:', data.recommendations);
};


const weeklyCalories = [
  { day: "Mon", calories: 1800 },
  { day: "Tue", calories: 2100 },
  { day: "Wed", calories: 1900 },
  { day: "Thu", calories: 2200 },
  { day: "Fri", calories: 2000 },
  { day: "Sat", calories: 2300 },
  { day: "Sun", calories: 1700 },
];

const macroData = [
  { name: "Protein", value: 30, color: "#52b788" },
  { name: "Carbs", value: 45, color: "#f4a261" },
  { name: "Fats", value: 25, color: "#e9c46a" },
];

const activityLog = [
  { label: "Breakfast", detail: "Oats with Fruits", cal: 220, time: "8:00 AM", icon: "🌅" },
  { label: "Lunch", detail: "Grilled Chicken + Rice", cal: 480, time: "1:00 PM", icon: "☀️" },
  { label: "Snack", detail: "Greek Yogurt", cal: 130, time: "4:30 PM", icon: "🍃" },
  { label: "Dinner", detail: "Salmon Fillet + Salad", cal: 420, time: "8:00 PM", icon: "🌙" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1a1a2e", color: "#fff",
        borderRadius: 10, padding: "10px 16px",
        fontSize: 13, fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}>
        <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
        <p style={{ color: "#52b788" }}>{payload[0].value} kcal</p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1a1a2e", color: "#fff",
        borderRadius: 10, padding: "10px 16px",
        fontSize: 13, fontFamily: "'DM Sans', sans-serif",
      }}>
        <p style={{ fontWeight: 700 }}>{payload[0].name}: <span style={{ color: payload[0].payload.color }}>{payload[0].value}%</span></p>
      </div>
    );
  }
  return null;
};

function StatCard({ icon, label, value, sub, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "28px 28px",
        border: "1px solid #f0f0f0",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.09)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s ease",
        display: "flex", flexDirection: "column", gap: 8,
      }}
    >
      <div style={{
        width: 42, height: 42,
        background: `${accent}18`,
        borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, marginBottom: 4,
      }}>{icon}</div>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
      <p style={{ fontSize: 32, fontWeight: 800, color: "#1a1a2e", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>{sub}</p>}
    </div>
  );
}

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#f7f8fa", fontFamily: "'DM Sans', sans-serif", gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>Access Restricted</h2>
        <p style={{ color: "#aaa", fontSize: 15 }}>Please log in to view your dashboard.</p>
      </div>
    );
  }

  const totalToday = activityLog.reduce((s, a) => s + a.cal, 0);
  const calorieGoal = 2200;
  const calorieProgress = Math.min((totalToday / calorieGoal) * 100, 100);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", paddingTop: 66, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Top Header Bar */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
        padding: "40px 60px 48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(82,183,136,0.07)", pointerEvents: "none" }} />
        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#52b788", marginBottom: 10 }}>Your Dashboard</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
          Welcome back, {user.name} 👋
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>Here's your personalized nutrition analytics overview.</p>
      </div>

      <div style={{ padding: "36px 60px 64px", maxWidth: 1380, margin: "0 auto" }}>

        {/* Stat Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20, marginBottom: 32,
        }}>
          <StatCard icon="💪" label="Health Score" value={`${user.healthScore || 82}%`} sub="Above average" accent="#52b788" />
          <StatCard icon="⚖️" label="BMI" value={user.bmi || "23.1"} sub="Normal range" accent="#f4a261" />
          <StatCard icon="🎯" label="Goal" value={user.goal || "Weight Loss"} sub="On track" accent="#e9c46a" />
          <StatCard icon="🔥" label="Today's Intake" value={`${totalToday}`} sub={`of ${calorieGoal} kcal`} accent="#e76f51" />
        </div>

        {/* Calorie Progress Bar */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "24px 28px",
          border: "1px solid #f0f0f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>Daily Calorie Goal</p>
              <p style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{totalToday} of {calorieGoal} kcal consumed</p>
            </div>
            <span style={{
              background: calorieProgress >= 100 ? "#fde8e8" : "#e8f5e9",
              color: calorieProgress >= 100 ? "#c0392b" : "#2d6a4f",
              fontSize: 12, fontWeight: 800, padding: "4px 12px", borderRadius: 99
            }}>{calorieProgress >= 100 ? "Goal Reached!" : `${Math.round(calorieProgress)}% complete`}</span>
          </div>
          <div style={{ height: 10, background: "#f0f0f0", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${calorieProgress}%`,
              background: calorieProgress >= 100
                ? "linear-gradient(90deg, #e76f51, #c0392b)"
                : "linear-gradient(90deg, #52b788, #2d6a4f)",
              transition: "width 0.8s ease",
            }} />
          </div>
        </div>

        {/* Charts Row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 24, marginBottom: 24,
        }}>
          {/* Bar Chart */}
          <div style={{
            background: "#fff", borderRadius: 20, padding: "28px",
            border: "1px solid #f0f0f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#52b788", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>This Week</p>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 24 }}>Calorie Intake</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyCalories} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#bbb", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#bbb", fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} domain={[1400, 2500]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(82,183,136,0.06)", radius: 8 }} />
                <Bar dataKey="calories" fill="#52b788" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={{
            background: "#fff", borderRadius: 20, padding: "28px",
            border: "1px solid #f0f0f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#52b788", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Today</p>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 24 }}>Macro Distribution</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <ResponsiveContainer width="55%" height={220}>
                <PieChart>
                  <Pie data={macroData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {macroData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {macroData.map((m, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: m.color }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>{m.name}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#1a1a2e" }}>{m.value}%</span>
                    </div>
                    <div style={{ height: 5, background: "#f0f0f0", borderRadius: 99 }}>
                      <div style={{ height: 5, width: `${m.value}%`, background: m.color, borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: "28px",
          border: "1px solid #f0f0f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "#52b788", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Today's Log</p>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 24 }}>Meal Activity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {activityLog.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 0",
                borderBottom: i < activityLog.length - 1 ? "1px solid #f5f5f5" : "none",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: "#f7f8fa",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>{item.detail}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e" }}>{item.cal} kcal</p>
                  <p style={{ fontSize: 12, color: "#ccc", marginTop: 2 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;