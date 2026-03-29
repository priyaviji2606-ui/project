import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const strengthLevels = [
  { label: "Too short", color: "#e74c3c", width: "20%" },
  { label: "Weak", color: "#e67e22", width: "40%" },
  { label: "Fair", color: "#f1c40f", width: "60%" },
  { label: "Good", color: "#2ecc71", width: "80%" },
  { label: "Strong", color: "#27ae60", width: "100%" },
];

function getPasswordStrength(password) {
  if (!password) return -1;
  if (password.length < 6) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  return score;
}

function PasswordStrengthBar({ password }) {
  const strength = getPasswordStrength(password);
  if (strength < 0) return null;
  const level = strengthLevels[strength];
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ height: 4, background: "#f0f0f0", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: level.width,
          background: level.color, borderRadius: 99,
          transition: "width 0.3s ease, background 0.3s ease",
        }} />
      </div>
      <p style={{ fontSize: 11, color: level.color, fontWeight: 700, marginTop: 5 }}>{level.label}</p>
    </div>
  );
}

function InputField({ label, name, type = "text", placeholder, value, onChange, children, error }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
          style={{
            width: "100%",
            padding: children ? "13px 46px 13px 16px" : "13px 16px",
            border: `1.5px solid ${error ? "#fca5a5" : "#ececec"}`,
            borderRadius: 12,
            fontSize: 15,
            fontFamily: "'DM Sans', sans-serif",
            color: "#1a1a2e",
            background: error ? "#fff5f5" : "#fafafa",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          }}
          onFocus={e => {
            e.target.style.borderColor = "#52b788";
            e.target.style.boxShadow = "0 0 0 4px rgba(82,183,136,0.12)";
            e.target.style.background = "#fff";
          }}
          onBlur={e => {
            e.target.style.borderColor = error ? "#fca5a5" : "#ececec";
            e.target.style.boxShadow = "none";
            e.target.style.background = error ? "#fff5f5" : "#fafafa";
          }}
        />
        {children}
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setFieldErrors({ ...fieldErrors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // frontend validation
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setFieldErrors({ email: true });
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setError("Password must be 8+ chars with uppercase, lowercase, number & special character.");
      setFieldErrors({ password: true });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        if (data.message.includes("exists")) {
          setFieldErrors({ email: true });
        }
        setLoading(false);
        return;
      }

      // ✅ success
      setLoading(false);
      navigate("/healthform");
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif", background: "#f7f8fa" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .shake { animation: shake 0.4s ease; }
      `}</style>

      {/* Left Panel */}
      <div style={{
        flex: "1 1 50%",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "80px 64px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 340, height: 340, borderRadius: "50%", background: "rgba(82,183,136,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(82,183,136,0.05)", pointerEvents: "none" }} />

        <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 56, cursor: "pointer" }}>
          <div style={{
            width: 38, height: 38,
            background: "rgba(82,183,136,0.15)",
            border: "1px solid rgba(82,183,136,0.3)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>🥗</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>NutriSmart</span>
        </div>

        <span style={{
          display: "inline-block",
          background: "rgba(82,183,136,0.15)", color: "#52b788",
          fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: 99, marginBottom: 20,
          border: "1px solid rgba(82,183,136,0.25)",
        }}>Join NutriSmart</span>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 900, color: "#fff",
          lineHeight: 1.2, marginBottom: 18,
        }}>
          Start your journey<br />to better health.
        </h2>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75, maxWidth: 380, marginBottom: 48 }}>
          Create your free account to unlock personalized meal plans, AI-driven nutrient insights, and real-time health tracking.
        </p>

        {/* Feature bullets */}
        {[
          "AI-powered nutrient deficiency detection",
          "Personalized meal recommendations",
          "Real-time health & BMI tracking",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "rgba(82,183,136,0.2)",
              border: "1px solid rgba(82,183,136,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, color: "#52b788", fontWeight: 800, flexShrink: 0,
            }}>✓</div>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Right Panel — Form */}
      <div style={{
        flex: "1 1 50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 48px", background: "#f7f8fa",
      }}>
        <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.55s ease" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: "#1a1a2e", marginBottom: 8 }}>
            Create account
          </h3>
          <p style={{ fontSize: 14, color: "#aaa", marginBottom: 32 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#52b788", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
          </p>

          {/* Error */}
          {error && (
            <div className="shake" style={{
              background: "#fff5f5", border: "1.5px solid #fca5a5",
              borderRadius: 12, padding: "12px 16px",
              fontSize: 14, color: "#c0392b",
              marginBottom: 24, display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={fieldErrors.email}
            />

            {/* Password */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 8 chars, uppercase, number, symbol"
                  onChange={handleChange}
                  value={form.password}
                  required
                  style={{
                    width: "100%",
                    padding: "13px 46px 13px 16px",
                    border: `1.5px solid ${fieldErrors.password ? "#fca5a5" : "#ececec"}`,
                    borderRadius: 12, fontSize: 15,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#1a1a2e",
                    background: fieldErrors.password ? "#fff5f5" : "#fafafa",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "#52b788";
                    e.target.style.boxShadow = "0 0 0 4px rgba(82,183,136,0.12)";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = fieldErrors.password ? "#fca5a5" : "#ececec";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = fieldErrors.password ? "#fff5f5" : "#fafafa";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 16, color: "#bbb", lineHeight: 1,
                  }}
                >{showPassword ? "🙈" : "👁️"}</button>
              </div>
              <PasswordStrengthBar password={form.password} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#a8d5bc" : "#1a1a2e",
                color: "#fff", border: "none", borderRadius: 12,
                padding: "14px", fontSize: 15, fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.03em", marginTop: 6,
                transition: "background 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = "#2d6a4f"; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = "#1a1a2e"; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Creating account…
                </>
              ) : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 12, color: "#ccc", marginTop: 28 }}>
            By registering, you agree to our{" "}
            <span style={{ color: "#52b788", cursor: "pointer" }}>Terms</span> &{" "}
            <span style={{ color: "#52b788", cursor: "pointer" }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;