import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const stats = [
  { number: "10K+", label: "Active Users", icon: "👤" },
  { number: "500+", label: "Healthy Meals", icon: "🥗" },
  { number: "4.9★", label: "User Rating", icon: "⭐" },
  { number: "AI", label: "Smart Predictions", icon: "🧠" },
];

const features = [
  {
    icon: "📊",
    title: "Smart Health Tracking",
    description: "Monitor BMI, calories, and health metrics with real-time insights and personalized recommendations tailored to you.",
  },
  {
    icon: "🔬",
    title: "AI Nutrient Analysis",
    description: "Predict potential deficiencies like Iron, Vitamin D, and Calcium before symptoms appear — powered by advanced AI.",
  },
  {
    icon: "🍽️",
    title: "Personalized Meals",
    description: "Order meals customized to your body profile, diet preference, and health goals — delivered fresh to your door.",
  },
];

const testimonials = [
  { text: "NutriSmart transformed how I manage my health. I've never felt better.", name: "Priya S.", role: "Fitness Enthusiast" },
  { text: "The AI recommendations are surprisingly accurate. It's like having a nutritionist in my pocket.", name: "Arjun M.", role: "Software Engineer" },
  { text: "Finally a smart nutrition system that actually works! Lost 8kg in 3 months.", name: "Ananya R.", role: "Yoga Instructor" },
];

function StatCard({ stat, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      background: "#fff",
      borderRadius: 20,
      padding: "36px 24px",
      textAlign: "center",
      border: "1px solid #f0f0f0",
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{stat.icon}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#1a1a2e", fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>{stat.number}</div>
      <div style={{ fontSize: 14, color: "#888", fontWeight: 600, letterSpacing: "0.03em" }}>{stat.label}</div>
    </div>
  );
}

function FeatureCard({ feature, delay }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 22,
        padding: "40px 32px",
        border: "1px solid #f0f0f0",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.10)" : "0 2px 16px rgba(0,0,0,0.05)",
        transform: visible ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.55s ease ${delay}ms, transform 0.3s ease, box-shadow 0.3s ease`,
      }}>
      <div style={{
        width: 54, height: 54,
        background: "linear-gradient(135deg, #e8f5e9, #d4edda)",
        borderRadius: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, marginBottom: 22,
      }}>{feature.icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>{feature.title}</h3>
      <p style={{ fontSize: 14, color: "#777", lineHeight: 1.75 }}>{feature.description}</p>
    </div>
  );
}

function TestimonialCard({ t, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      background: "#fff",
      borderRadius: 20,
      padding: "36px 32px",
      border: "1px solid #f0f0f0",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      textAlign: "left",
    }}>
      <div style={{ color: "#f4a261", fontSize: 18, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
      <p style={{ fontSize: 15, color: "#444", lineHeight: 1.75, fontStyle: "italic", marginBottom: 24 }}>"{t.text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40,
          background: "linear-gradient(135deg, #52b788, #2d6a4f)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, color: "#fff", fontSize: 15,
        }}>{t.name[0]}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{t.name}</div>
          <div style={{ fontSize: 12, color: "#aaa" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [heroVisible, setHeroVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", fontFamily: "'DM Sans', sans-serif", color: "#1a1a2e", paddingTop: 66 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
        padding: "88px 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 48, flexWrap: "wrap",
        minHeight: 560,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(82,183,136,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: 200, width: 200, height: 200, borderRadius: "50%", background: "rgba(82,183,136,0.05)", pointerEvents: "none" }} />

        <div style={{
          maxWidth: 520, flex: "1 1 300px",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.65s ease, transform 0.65s ease",
        }}>
          <span style={{
            display: "inline-block",
            background: "rgba(82,183,136,0.15)",
            color: "#52b788",
            fontSize: 12, fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "6px 14px", borderRadius: 99, marginBottom: 22,
            border: "1px solid rgba(82,183,136,0.25)",
          }}>Smart Health Platform</span>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 900, lineHeight: 1.15,
            color: "#fff", marginBottom: 22,
          }}>
            Personalized Nutrition<br />
            <span style={{ color: "#52b788" }}>Powered by AI</span>
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
            Track health metrics, predict nutrient deficiencies, and order personalized meals — all from one intelligent platform designed for modern lifestyles.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate(user ? "/dashboard" : "/login")}
              style={{
                background: "#52b788", color: "#fff",
                border: "none", borderRadius: 12,
                padding: "14px 32px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.02em",
                boxShadow: "0 8px 24px rgba(82,183,136,0.35)",
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 32px rgba(82,183,136,0.45)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(82,183,136,0.35)"; }}
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </button>

            <button
              onClick={() => navigate("/menu")}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: 12,
                padding: "14px 32px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.02em",
                transition: "background 0.18s ease, border-color 0.18s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; }}
            >
              Browse Meals
            </button>
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 24 }}>
            ✔ Trusted by 10,000+ users worldwide
          </p>
        </div>

        {/* Hero Image */}
        <div style={{
          flex: "1 1 320px", maxWidth: 420,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateX(0)" : "translateX(32px)",
          transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s",
        }}>
          <img
            src={imgError
              ? "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop"
              : "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80"}
            alt="Healthy food"
            onError={() => setImgError(true)}
            style={{
              width: "100%", borderRadius: 24,
              boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "72px 80px", background: "#f7f8fa" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20, maxWidth: 960, margin: "0 auto",
        }}>
          {stats.map((s, i) => <StatCard key={i} stat={s} delay={i * 80} />)}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "72px 80px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#52b788", marginBottom: 12 }}>What We Offer</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900, color: "#1a1a2e" }}>Why Choose NutriSmart?</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {features.map((f, i) => <FeatureCard key={i} feature={f} delay={i * 100} />)}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "72px 80px", background: "#f7f8fa" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#52b788", marginBottom: 12 }}>User Stories</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900, color: "#1a1a2e" }}>Loved by Our Users</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} delay={i * 100} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        padding: "88px 80px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "rgba(82,183,136,0.07)", pointerEvents: "none" }} />
        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#52b788", marginBottom: 16 }}>Start Today</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
          Begin Your Health Journey
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 40, maxWidth: 460, margin: "0 auto 40px" }}>
          Join thousands improving their nutrition with NutriSmart's AI-powered platform.
        </p>
        <button
          onClick={() => navigate(user ? "/dashboard" : "/login")}
          style={{
            background: "#52b788", color: "#fff",
            border: "none", borderRadius: 14,
            padding: "16px 44px", fontSize: 16, fontWeight: 800,
            cursor: "pointer", letterSpacing: "0.02em",
            boxShadow: "0 8px 32px rgba(82,183,136,0.35)",
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 14px 40px rgba(82,183,136,0.45)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(82,183,136,0.35)"; }}
        >
          {user ? "Open Dashboard" : "Create Free Account"}
        </button>
      </section>
    </div>
  );
}

export default Home;