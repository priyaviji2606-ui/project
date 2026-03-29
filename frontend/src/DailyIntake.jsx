import axios from "axios";
import { useState, useEffect } from "react";

export const DailyIntake = () => {
  const [dailyStats, setDailyStats] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [goals, setGoals] = useState({ calories: 2000, protein: 50, carbs: 250, fats: 70 }); // Default fallback goals
  const [meals, setMeals] = useState([]);
  const [mealForm, setMealForm] = useState({
    foodName: "", calories: "", protein: "", carbs: "", fats: "", volume: "", type: "Breakfast",
  });

  const fetchData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || storedUser?._id;
    if (!userId) return;

    try {
      // Fetch both current stats and the user's goals (recommendations)
      const [statsRes, goalRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/meals/daily-stats/${userId}`),
        axios.post("http://localhost:5000/api/recommend", { userId })
      ]);

      if (statsRes.data.success) {
        setDailyStats(statsRes.data.totals);
        setMeals(statsRes.data.mealHistory);
      }
      
      if (goalRes.data) {
        // Map the API response to our goal state
        setGoals({
          calories: goalRes.data.dailyCalories || 2000,
          protein: goalRes.data.protein || 50,
          carbs: goalRes.data.carbs || 250,
          fats: goalRes.data.fats || 70
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMealChange = (e) => {
    setMealForm({ ...mealForm, [e.target.name]: e.target.value });
  };

  const handleMealSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || storedUser?._id;

    try {
      const res = await axios.post("http://localhost:5000/api/meals/add", {
        ...mealForm,
        userId,
        calories: Number(mealForm.calories),
        protein: Number(mealForm.protein),
        carbs: Number(mealForm.carbs),
        fats: Number(mealForm.fats),
        volume: Number(mealForm.volume),
        mealType: mealForm.type,
      });

      if (res.data.success) {
        setMealForm({ foodName: "", calories: "", protein: "", carbs: "", fats: "", volume: "", type: "Breakfast" });
        fetchData(); 
      }
    } catch (err) {
      console.error("Error logging meal:", err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto p-4 pb-20">
      <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:justify-between md:items-end">
        <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Daily Intake</h1>
            <p className="mt-2 text-slate-500">Log your meals and track your progress against goals.</p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Daily Target</p>
            <p className="text-sm font-bold text-emerald-800">{goals.calories} kcal</p>
        </div>
      </header>

      {/* 1. Quick Stats Cards with Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Calories" current={dailyStats.calories} goal={goals.calories} unit="kcal" color="bg-emerald-500" textColor="text-emerald-600" />
        <StatCard label="Protein" current={dailyStats.protein} goal={goals.protein} unit="g" color="bg-blue-500" textColor="text-blue-600" />
        <StatCard label="Carbs" current={dailyStats.carbs} goal={goals.carbs} unit="g" color="bg-orange-500" textColor="text-orange-500" />
        <StatCard label="Fats" current={dailyStats.fats} goal={goals.fats} unit="g" color="bg-red-500" textColor="text-red-500" />
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* 2. Meal Form */}
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Add New Entry</h3>
          <form onSubmit={handleMealSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Food Name</label>
                <input name="foodName" value={mealForm.foodName} onChange={handleMealChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm outline-none focus:border-emerald-500 transition-all" placeholder="Grilled Chicken..." required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Meal Type</label>
                <select name="type" value={mealForm.type} onChange={handleMealChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm outline-none focus:border-emerald-500 transition-all">
                  <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[{ label: "Calories", name: "calories", unit: "kcal" }, { label: "Protein", name: "protein", unit: "g" }, { label: "Carbs", name: "carbs", unit: "g" }, { label: "Fats", name: "fats", unit: "g" }, { label: "Volume", name: "volume", unit: "g" }].map((f) => (
                <div key={f.name} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{f.label}</label>
                  <input type="number" name={f.name} value={mealForm[f.name]} onChange={handleMealChange} placeholder={f.unit} className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm outline-none focus:border-emerald-500 transition-all" required />
                </div>
              ))}
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">Log Meal Entry</button>
          </form>
        </div>

        {/* 3. Today's Logged Meals Table */}
        <div className="bg-white rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Today's Log</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">{meals.length} Items</span>
          </div>

          {meals.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              <p className="text-sm">No meals logged for today yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Meal</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Cals</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">P/C/F</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {meals.map((meal, index) => (
                    <tr key={meal._id || index} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-700 text-sm">{meal.foodName}</td>
                      <td className="py-4 text-right text-emerald-600 font-bold text-sm">{meal.calories}</td>
                      <td className="py-4 text-right text-slate-500 text-[11px] font-medium">
                        {meal.protein}g / {meal.carbs}g / {meal.fats}g
                      </td>
                      <td className="py-4 text-right">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                          meal.mealType === 'Breakfast' ? 'bg-orange-50 text-orange-600' :
                          meal.mealType === 'Lunch' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {meal.mealType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, current, goal, unit, color, textColor }) => {
  const percentage = Math.min((current / goal) * 100, 100) || 0;
  const isOverGoal = current > goal;

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
        <p className="text-[10px] font-bold text-slate-300">{goal}{unit}</p>
      </div>
      <p className={`text-xl md:text-2xl font-bold ${textColor}`}>
        {current || 0} <span className="text-xs font-normal text-slate-400">{unit}</span>
      </p>
      <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${isOverGoal ? 'bg-red-500' : color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};