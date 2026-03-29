import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HealthForm({ embedded = false }) {
  const navigate = useNavigate();

  // ✅ Safe user parsing
  let loggedUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    loggedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Invalid user in localStorage");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, [loggedUser, navigate]);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    diet: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateBMI = async () => {
    if (
      !form.age ||
      !form.gender ||
      !form.height ||
      !form.weight ||
      !form.diet
    ) {
      alert("Please fill all fields");
      return;
    }

    const height = Number(form.height);
    const weight = Number(form.weight);

    if (height <= 0 || weight <= 0) {
      alert("Height and Weight must be valid numbers");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = Number(
      (weight / (heightInMeters * heightInMeters)).toFixed(1),
    );

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
      suggestion =
        "Follow calorie deficit diet and increase physical activity.";
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/user/update-health",
        {
          userId: loggedUser?.id || loggedUser?._id, // Handle both id formats
          ...form,
          bmi: bmiValue,
          bmiCategory: category,
          suggestion,
        },
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={containerStyle}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');`}</style>

      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 10px",
            }}
          >
            Health Metrics
          </h2>
          <p style={{ fontSize: "14px", color: "#aaa", margin: 0 }}>
            Update your biometrics for accurate AI recommendations.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div style={inputWrapper}>
            <label style={labelStyle}>Age</label>
            <input
              type="number"
              name="age"
              placeholder="25"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={inputWrapper}>
            <label style={labelStyle}>Gender</label>
            <select name="gender" onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div style={inputWrapper}>
            <label style={labelStyle}>Height (cm)</label>
            <input
              type="number"
              name="height"
              placeholder="175"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={inputWrapper}>
            <label style={labelStyle}>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="70"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ ...inputWrapper, gridColumn: "span 2" }}>
            <label style={labelStyle}>Dietary Preference</label>
            <select name="diet" onChange={handleChange} style={inputStyle}>
              <option value="">Choose preference</option>
              <option>Vegetarian</option>
              <option>Non-Vegetarian</option>
              <option>Vegan</option>
              <option>Keto</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateBMI}
          disabled={loading}
          style={{
            ...buttonStyle,
            background: loading ? "#ccc" : "#52b788",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Calculate & Sync Dashboard"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            color: "#aaa",
            marginTop: "15px",
            fontSize: "13px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Cancel and return
        </button>
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'DM Sans', sans-serif",
  padding: "40px 20px",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "28px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
  width: "100%",
  maxWidth: "500px",
  border: "1px solid #f0f0f0",
};

const inputWrapper = { display: "flex", flexDirection: "column", gap: "6px" };
const labelStyle = {
  fontSize: "11px",
  fontWeight: 800,
  color: "#bbb",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle = {
  border: "1px solid #eee",
  padding: "12px 16px",
  borderRadius: "12px",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#fcfcfc",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const buttonStyle = {
  width: "100%",
  marginTop: "30px",
  padding: "16px",
  borderRadius: "14px",
  color: "white",
  border: "none",
  fontWeight: 800,
  fontSize: "15px",
  transition: "all 0.3s ease",
};

export default HealthForm;
