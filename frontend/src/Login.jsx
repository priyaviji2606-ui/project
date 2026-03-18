import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // Store user (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);
      navigate("/dashboard");

    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'DM Sans', sans-serif",
      background: "#f7f8fa",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #ececec;
          border-radius: 12px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a2e;
          background: #fafafa;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: #52b788;
          box-shadow: 0 0 0 4px rgba(82,183,136,0.12);
          background: #fff;
        }
        .input-field::placeholder { color: #bbb; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }
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
        {/* Decorative blobs */}
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
          background: "rgba(82,183,136,0.15)",
          color: "#52b788",
          fontSize: 11, fontWeight: 800,
          letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: 99, marginBottom: 20,
          border: "1px solid rgba(82,183,136,0.25)",
        }}>Welcome Back</span>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 900, color: "#fff",
          lineHeight: 1.2, marginBottom: 18,
        }}>
          Your health journey<br />continues here.
        </h2>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75, maxWidth: 380, marginBottom: 48 }}>
          Log in to access your personalized dashboard, AI-powered insights, and curated nutrition plan.
        </p>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex" }}>
            {["P", "A", "R", "S"].map((l, i) => (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: "50%",
                background: `hsl(${140 + i * 20}, 50%, ${45 + i * 5}%)`,
                border: "2px solid #1a1a2e",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: "#fff",
                marginLeft: i === 0 ? 0 : -10,
              }}>{l}</div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
            <span style={{ color: "#52b788", fontWeight: 700 }}>10,000+</span> users tracking their health
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={{
        flex: "1 1 50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 48px",
        background: "#f7f8fa",
      }}>
        <div style={{
          width: "100%", maxWidth: 420,
          animation: "fadeUp 0.55s ease",
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: "#1a1a2e", marginBottom: 8 }}>
            Sign in
          </h3>
          <p style={{ fontSize: 14, color: "#aaa", marginBottom: 36 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#52b788", fontWeight: 700, textDecoration: "none" }}>
              Create one free
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="shake" style={{
              background: "#fff5f5",
              border: "1.5px solid #fca5a5",
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 14, color: "#c0392b",
              marginBottom: 24,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={form.email}
                required
                className="input-field"
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#555", letterSpacing: "0.02em" }}>
                  Password
                </label>
                <span style={{ fontSize: 12, color: "#52b788", fontWeight: 600, cursor: "pointer" }}>
                  Forgot password?
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={form.password}
                  required
                  className="input-field"
                  style={{ paddingRight: 46 }}
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#a8d5bc" : "#1a1a2e",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px",
                fontSize: 15,
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.03em",
                marginTop: 6,
                transition: "background 0.2s ease, transform 0.15s ease",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = "#2d6a4f"; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = "#1a1a2e"; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Signing in…
                </>
              ) : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 12, color: "#ccc", marginTop: 32 }}>
            By signing in, you agree to our{" "}
            <span style={{ color: "#52b788", cursor: "pointer" }}>Terms</span> &{" "}
            <span style={{ color: "#52b788", cursor: "pointer" }}>Privacy Policy</span>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Login;