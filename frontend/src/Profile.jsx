import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (!storedProfile) {
      navigate("/login");
    } else {
      setProfile(storedProfile);
    }
  }, []);

  if (!profile) return null;

  const getStatusColor = () => {
    switch (profile.bmiCategory) {
      case "Underweight":
        return "text-yellow-500";
      case "Normal":
        return "text-green-600";
      case "Overweight":
        return "text-orange-500";
      case "Obese":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 md:px-16">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* ===== Page Title ===== */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Health Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your personal health metrics
          </p>
        </div>

        {/* ===== Top Profile Card ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center">
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-gray-500">{profile.email}</p>
          </div>

          <button
            onClick={() => navigate("/health-form")}
            className="mt-4 md:mt-0 px-6 py-2 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition"
          >
            Update Health Data
          </button>

        </div>

        {/* ===== Health Metrics Grid ===== */}
        <div className="grid md:grid-cols-3 gap-6">

          <MetricCard label="Age" value={profile.age} unit="Years" />
          <MetricCard label="Height" value={profile.height} unit="cm" />
          <MetricCard label="Weight" value={profile.weight} unit="kg" />

        </div>

        {/* ===== BMI Section ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-10">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Body Mass Index (BMI)
              </h3>
              <p className="text-gray-500 mt-1">
                Indicator of body fat based on height and weight
              </p>
            </div>

            <div className="text-center mt-6 md:mt-0">
              <p className="text-5xl font-bold text-gray-800">
                {profile.bmi}
              </p>
              <p className={`font-semibold mt-2 ${getStatusColor()}`}>
                {profile.bmiCategory}
              </p>
            </div>

          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-2">
              Health Recommendation
            </h4>
            <p className="text-gray-600">
              {profile.suggestion}
            </p>
          </div>

        </div>

        {/* ===== Diet Preference Section ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Nutrition Preference
          </h3>
          <p className="text-gray-600">
            Preferred Diet Type: 
            <span className="ml-2 font-medium text-gray-800">
              {profile.diet}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ label, value, unit }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">
        {value} <span className="text-sm text-gray-400">{unit}</span>
      </p>
    </div>
  );
}

export default Profile;