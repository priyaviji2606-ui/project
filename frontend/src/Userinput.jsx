import React, { useState } from "react";

function Userinput() {
  const [user, setUser] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    diet: "",
    bmi: null,
    bmiCategory: "",
    suggestion: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const calculateBMI = () => {
    const heightInMeters = user.height / 100;
    const bmiValue = (
      user.weight /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    let category = "";
    let suggestion = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      suggestion = "Increase calorie intake with protein-rich foods.";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
      suggestion = "Maintain balanced diet and regular activity.";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
      suggestion = "Reduce processed carbs and increase fiber intake.";
    } else {
      category = "Obese";
      suggestion = "Follow calorie deficit diet and increase physical activity.";
    }

    setUser({
      ...user,
      bmi: bmiValue,
      bmiCategory: category,
      suggestion: suggestion,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-10">

      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-600">
          User Health Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={user.age}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />

          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={user.height}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={user.weight}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />

          <select
            name="diet"
            value={user.diet}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Diet Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
          </select>

        </div>

        <div className="text-center mt-8">
          <button
            onClick={calculateBMI}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition"
          >
            Calculate BMI
          </button>
        </div>

        {user.bmi && (
          <div className="mt-10 bg-emerald-50 p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Your Results</h3>
            <p className="text-lg">
              BMI: <span className="font-bold text-emerald-600">{user.bmi}</span>
            </p>
            <p>
              Category:{" "}
              <span className="font-semibold">{user.bmiCategory}</span>
            </p>
            <p className="mt-3 text-gray-600">{user.suggestion}</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Userinput;