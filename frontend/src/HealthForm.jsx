import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HealthForm() {
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, []);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    diet: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateBMI = () => {
    const heightInMeters = form.height / 100;
    const bmiValue = (
      form.weight /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    let category = "";
    let suggestion = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      suggestion = "Increase calorie intake with protein-rich foods.";
    } else if (bmiValue < 25) {
      category = "Normal";
      suggestion = "Maintain balanced diet and regular activity.";
    } else if (bmiValue < 30) {
      category = "Overweight";
      suggestion = "Reduce processed carbs and increase fiber intake.";
    } else {
      category = "Obese";
      suggestion = "Follow calorie deficit diet and increase physical activity.";
    }

    const completeProfile = {
      ...loggedUser,
      ...form,
      bmi: bmiValue,
      bmiCategory: category,
      suggestion,
    };

    localStorage.setItem("userProfile", JSON.stringify(completeProfile));

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center pt-24">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Enter Health Details
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="diet"
            onChange={handleChange}
            className="border p-3 rounded-lg col-span-2"
          >
            <option value="">Diet Preference</option>
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
          </select>

        </div>

        <button
          onClick={calculateBMI}
          className="w-full mt-6 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Calculate & Continue
        </button>
      </div>
    </div>
  );
}

export default HealthForm;