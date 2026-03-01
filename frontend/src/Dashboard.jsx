import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black text-xl">
        Please login to view dashboard.
      </div>
    );
  }

  // Sample Weekly Data
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
    { name: "Protein", value: 30 },
    { name: "Carbs", value: 45 },
    { name: "Fats", value: 25 },
  ];

  const COLORS = ["#10B981", "#34D399", "#059669"]; // Emerald shades

  return (
    <div className="min-h-screen bg-white pt-24 px-10">

      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-emerald-600">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here is your personalized nutrition analytics overview.
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-sm text-gray-500">Health Score</h2>
          <p className="text-4xl font-bold text-black mt-2">
            {user.healthScore || 82}%
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-sm text-gray-500">BMI</h2>
          <p className="text-4xl font-bold text-black mt-2">
            {user.bmi || 23.1}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-sm text-gray-500">Goal</h2>
          <p className="text-2xl font-bold text-black mt-2">
            {user.goal || "Weight Loss"}
          </p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Weekly Calories */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-black mb-6">
            Weekly Calorie Intake
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyCalories}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="calories"
                fill="#10B981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Macronutrient Pie */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-black mb-6">
            Macronutrient Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;