// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const BMI_RANGES = [
//   { label: "Underweight", max: 18.5, color: "#f4a261" },
//   { label: "Normal", max: 25, color: "#52b788" },
//   { label: "Overweight", max: 30, color: "#e76f51" },
//   { label: "Obese", max: 100, color: "#c0392b" },
// ];

// function getBmiConfig(category) {
//   const map = {
//     Underweight: { color: "#f4a261", bg: "#fff8f0", bar: 18 },
//     Normal: { color: "#52b788", bg: "#f0faf5", bar: 42 },
//     Overweight: { color: "#e76f51", bg: "#fff4f0", bar: 68 },
//     Obese: { color: "#c0392b", bg: "#fff0f0", bar: 90 },
//   };
//   return map[category] || { color: "#aaa", bg: "#f5f5f5", bar: 0 };
// }

// function MetricCard({ label, value, unit, icon, delay }) {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), delay);
//     return () => clearTimeout(t);
//   }, [delay]);

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: 20,
//         padding: "28px 28px",
//         border: "1px solid #f0f0f0",
//         boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : "translateY(20px)",
//         transition: "opacity 0.5s ease, transform 0.5s ease",
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       <div style={{ fontSize: 26, marginBottom: 14 }}>{icon}</div>
//       <p
//         style={{
//           fontSize: 12,
//           fontWeight: 700,
//           color: "#bbb",
//           letterSpacing: "0.1em",
//           textTransform: "uppercase",
//           marginBottom: 8,
//         }}
//       >
//         {label}
//       </p>
//       <p style={{ fontSize: 32, fontWeight: 800, color: "#1a1a2e" }}>
//         {value}
//         <span
//           style={{
//             fontSize: 14,
//             fontWeight: 600,
//             color: "#bbb",
//             marginLeft: 6,
//           }}
//         >
//           {unit}
//         </span>
//       </p>
//     </div>
//   );
// }

// function Profile() {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const storedUser = localStorage.getItem("user");

//       if (!storedUser) {
//         navigate("/login", { replace: true });
//         return;
//       }

//       try {
//         const parsedUser = JSON.parse(storedUser);

//         // ✅ Call backend API
//         const res = await axios.get(
//           `http://localhost:5000/api/user/get-health/${parsedUser._id}`,
//         );

//         setProfile(res.data.user);

//         // ✅ Sync localStorage (important)
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       } catch (err) {
//         console.error("Profile fetch error:", err);
//         localStorage.removeItem("user");
//         navigate("/login");
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   if (!profile) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontFamily: "'DM Sans', sans-serif",
//           background: "#f7f8fa",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               width: 44,
//               height: 44,
//               border: "3px solid #ececec",
//               borderTopColor: "#52b788",
//               borderRadius: "50%",
//               animation: "spin 0.8s linear infinite",
//               margin: "0 auto 16px",
//             }}
//           />
//           <p style={{ color: "#aaa", fontSize: 15 }}>Loading profile…</p>
//         </div>
//       </div>
//     );
//   }

//   const bmiConfig = getBmiConfig(profile.bmiCategory);
//   const initials = (profile.name || "U")
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f7f8fa",
//         fontFamily: "'DM Sans', sans-serif",
//         paddingTop: 66,
//       }}
//     >
//       <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
//           * { box-sizing: border-box; margin: 0; padding: 0; }
//           @keyframes spin { to { transform: rotate(360deg); } }
//           @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
//         `}</style>

//       {/* Header Banner */}
//       <div
//         style={{
//           background:
//             "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
//           padding: "48px 64px 64px",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: -80,
//             right: -80,
//             width: 300,
//             height: 300,
//             borderRadius: "50%",
//             background: "rgba(82,183,136,0.08)",
//             pointerEvents: "none",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             bottom: -40,
//             left: 300,
//             width: 180,
//             height: 180,
//             borderRadius: "50%",
//             background: "rgba(82,183,136,0.05)",
//             pointerEvents: "none",
//           }}
//         />

//         <p
//           style={{
//             fontSize: 12,
//             fontWeight: 800,
//             letterSpacing: "0.12em",
//             textTransform: "uppercase",
//             color: "#52b788",
//             marginBottom: 10,
//           }}
//         >
//           My Profile
//         </p>
//         <h1
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "clamp(28px, 4vw, 40px)",
//             fontWeight: 900,
//             color: "#fff",
//             lineHeight: 1.2,
//             marginBottom: 6,
//           }}
//         >
//           Health Dashboard
//         </h1>
//         <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>
//           Overview of your personal health metrics
//         </p>
//       </div>

//       <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 40px 80px" }}>
//         {/* Profile Card — overlaps banner */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: 22,
//             border: "1px solid #f0f0f0",
//             boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
//             padding: "32px 36px",
//             marginTop: -32,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 20,
//             animation: "fadeUp 0.5s ease",
//             position: "relative",
//             zIndex: 2,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//             <div
//               style={{
//                 width: 62,
//                 height: 62,
//                 background: "linear-gradient(135deg, #52b788, #2d6a4f)",
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 22,
//                 fontWeight: 800,
//                 color: "#fff",
//                 flexShrink: 0,
//                 boxShadow: "0 4px 16px rgba(82,183,136,0.3)",
//               }}
//             >
//               {initials}
//             </div>
//             <div>
//               <h2
//                 style={{
//                   fontSize: 20,
//                   fontWeight: 800,
//                   color: "#1a1a2e",
//                   marginBottom: 4,
//                 }}
//               >
//                 {profile.name}
//               </h2>
//               <p style={{ fontSize: 14, color: "#aaa" }}>{profile.email}</p>
//             </div>
//           </div>

//           <button
//             onClick={() => navigate("/healthform")}
//             style={{
//               background: "#1a1a2e",
//               color: "#fff",
//               border: "none",
//               borderRadius: 12,
//               padding: "11px 24px",
//               fontSize: 14,
//               fontWeight: 700,
//               cursor: "pointer",
//               letterSpacing: "0.02em",
//               transition: "background 0.18s ease",
//               fontFamily: "'DM Sans', sans-serif",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "#2d6a4f")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a2e")}
//           >
//             ✏️ Update Health Data
//           </button>
//         </div>

//         {/* Metrics */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: 18,
//             marginTop: 24,
//           }}
//         >
//           <MetricCard
//             label="Age"
//             value={profile.age}
//             unit="Years"
//             icon="🎂"
//             delay={100}
//           />
//           <MetricCard
//             label="Height"
//             value={profile.height}
//             unit="cm"
//             icon="📏"
//             delay={180}
//           />
//           <MetricCard
//             label="Weight"
//             value={profile.weight}
//             unit="kg"
//             icon="⚖️"
//             delay={260}
//           />
//         </div>

//         {/* BMI Card */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: 22,
//             border: "1px solid #f0f0f0",
//             boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
//             padding: "36px 36px",
//             marginTop: 24,
//             animation: "fadeUp 0.55s ease 0.2s both",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-start",
//               justifyContent: "space-between",
//               flexWrap: "wrap",
//               gap: 24,
//             }}
//           >
//             <div style={{ flex: 1 }}>
//               <p
//                 style={{
//                   fontSize: 12,
//                   fontWeight: 800,
//                   color: "#bbb",
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   marginBottom: 10,
//                 }}
//               >
//                 Body Mass Index
//               </p>
//               <h3
//                 style={{
//                   fontSize: 18,
//                   fontWeight: 800,
//                   color: "#1a1a2e",
//                   marginBottom: 6,
//                 }}
//               >
//                 BMI Score
//               </h3>
//               <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.65 }}>
//                 Indicator of body fat based on your height and weight
//                 measurements.
//               </p>
//             </div>

//             {/* BMI Value */}
//             <div
//               style={{
//                 background: bmiConfig.bg,
//                 border: `1.5px solid ${bmiConfig.color}22`,
//                 borderRadius: 20,
//                 padding: "24px 40px",
//                 textAlign: "center",
//                 minWidth: 160,
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: 48,
//                   fontWeight: 900,
//                   color: bmiConfig.color,
//                   lineHeight: 1,
//                   fontFamily: "'Playfair Display', serif",
//                 }}
//               >
//                 {profile.bmi}
//               </p>
//               <p
//                 style={{
//                   marginTop: 8,
//                   fontSize: 13,
//                   fontWeight: 800,
//                   color: bmiConfig.color,
//                   letterSpacing: "0.05em",
//                 }}
//               >
//                 {profile.bmiCategory}
//               </p>
//             </div>
//           </div>

//           {/* BMI Scale Bar */}
//           <div style={{ marginTop: 32 }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontSize: 11,
//                 color: "#ccc",
//                 marginBottom: 8,
//                 fontWeight: 600,
//               }}
//             >
//               <span>Underweight</span>
//               <span>Normal</span>
//               <span>Overweight</span>
//               <span>Obese</span>
//             </div>
//             <div
//               style={{
//                 height: 10,
//                 borderRadius: 99,
//                 background:
//                   "linear-gradient(to right, #f4a261, #52b788, #e76f51, #c0392b)",
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   left: `${bmiConfig.bar}%`,
//                   top: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: 20,
//                   height: 20,
//                   background: "#fff",
//                   border: `3px solid ${bmiConfig.color}`,
//                   borderRadius: "50%",
//                   boxShadow: `0 2px 8px ${bmiConfig.color}55`,
//                   transition: "left 0.8s ease",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Suggestion */}
//           <div
//             style={{
//               marginTop: 28,
//               background: bmiConfig.bg,
//               border: `1px solid ${bmiConfig.color}22`,
//               borderRadius: 14,
//               padding: "18px 22px",
//               display: "flex",
//               gap: 14,
//               alignItems: "flex-start",
//             }}
//           >
//             <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
//             <div>
//               <p
//                 style={{
//                   fontSize: 13,
//                   fontWeight: 800,
//                   color: bmiConfig.color,
//                   marginBottom: 5,
//                 }}
//               >
//                 Health Recommendation
//               </p>
//               <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>
//                 {profile.suggestion}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Diet Preference */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: 22,
//             border: "1px solid #f0f0f0",
//             boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
//             padding: "32px 36px",
//             marginTop: 24,
//             animation: "fadeUp 0.55s ease 0.3s both",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 16,
//           }}
//         >
//           <div>
//             <p
//               style={{
//                 fontSize: 12,
//                 fontWeight: 800,
//                 color: "#bbb",
//                 letterSpacing: "0.1em",
//                 textTransform: "uppercase",
//                 marginBottom: 10,
//               }}
//             >
//               Nutrition
//             </p>
//             <h3
//               style={{
//                 fontSize: 17,
//                 fontWeight: 800,
//                 color: "#1a1a2e",
//                 marginBottom: 4,
//               }}
//             >
//               Diet Preference
//             </h3>
//             <p style={{ fontSize: 14, color: "#aaa" }}>
//               Your personalized nutrition type
//             </p>
//           </div>

//           <div
//             style={{
//               background: "linear-gradient(135deg, #f0faf5, #e8f5e9)",
//               border: "1.5px solid rgba(82,183,136,0.2)",
//               borderRadius: 14,
//               padding: "14px 28px",
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//             }}
//           >
//             <span style={{ fontSize: 22 }}>🥗</span>
//             <span style={{ fontSize: 16, fontWeight: 800, color: "#2d6a4f" }}>
//               {profile.diet}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper for BMI colors and positions
function getBmiConfig(category) {
  const map = {
    Underweight: { color: "#f4a261", bg: "#fff8f0", bar: 15 },
    Normal: { color: "#52b788", bg: "#f0faf5", bar: 40 },
    Overweight: { color: "#e76f51", bg: "#fff4f0", bar: 65 },
    Obese: { color: "#c0392b", bg: "#fff0f0", bar: 90 },
  };
  return map[category] || { color: "#aaa", bg: "#f5f5f5", bar: 0 };
}

function MetricCard({ label, value, unit, icon, delay }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: "24px",
        border: "1px solid #f0f0f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        animation: `fadeUp 0.5s ease ${delay}ms both`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e" }}>
        {value} <span style={{ fontSize: 14, fontWeight: 600, color: "#bbb" }}>{unit}</span>
      </p>
    </div>
  );
}

function ProfileSection() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login");
        return;
      }
      try {
        const parsedUser = JSON.parse(storedUser);
        const res = await axios.get(`http://localhost:5000/api/user/get-health/${parsedUser._id}`);
        setProfile(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!profile) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading Health Data...</div>;

  const bmiConfig = getBmiConfig(profile.bmiCategory);
  const initials = (profile.name || "U").split(" ").map(w => w[0]).join("").toUpperCase();

  return (
    <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto", paddingBottom: 40 }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header Area */}
      <div style={{ 
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", 
        borderRadius: 32, 
        padding: "40px", 
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        marginBottom: 24,
        boxShadow: "0 20px 40px rgba(15, 52, 96, 0.2)"
      }}>
         {/* Decorative Circles */}
        <div style={{ position: "absolute", top: -20, right: -20, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ 
              width: 70, height: 70, borderRadius: "50%", 
              background: "linear-gradient(135deg, #52b788, #2d6a4f)", 
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 800, color: "#fff",
              boxShadow: "0 8px 20px rgba(82, 183, 136, 0.4)"
            }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{profile.name}</h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{profile.email}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/healthform")}
            style={{ 
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
              color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 24px", borderRadius: 16, cursor: "pointer", fontWeight: 700, fontSize: 14
            }}
          >
            Edit Health Stats
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 24 }}>
        <MetricCard label="Age" value={profile.age} unit="yrs" icon="🎂" delay={100} />
        <MetricCard label="Weight" value={profile.weight} unit="kg" icon="⚖️" delay={200} />
        <MetricCard label="Height" value={profile.height} unit="cm" icon="📏" delay={300} />
        <div style={{ 
          background: "linear-gradient(135deg, #f0faf5, #e8f5e9)", 
          borderRadius: 24, padding: "24px", border: "1px solid rgba(82,183,136,0.2)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          animation: "fadeUp 0.5s ease 400ms both"
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#2d6a4f", opacity: 0.6, textTransform: "uppercase", marginBottom: 8 }}>Diet Type</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🥗</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#2d6a4f" }}>{profile.diet}</span>
          </div>
        </div>
      </div>

      {/* BMI & Analysis */}
      <div style={{ 
        background: "#fff", borderRadius: 32, padding: "32px", border: "1px solid #f0f0f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)", animation: "fadeUp 0.5s ease 500ms both"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>BMI Analysis</h3>
            <p style={{ fontSize: 14, color: "#aaa" }}>Based on your recent measurements</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: bmiConfig.color, display: "block", lineHeight: 1 }}>{profile.bmi}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: bmiConfig.color, textTransform: "uppercase" }}>{profile.bmiCategory}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 12, background: "#f0f0f0", borderRadius: 10, position: "relative", marginBottom: 30 }}>
            <div style={{ 
              position: "absolute", left: 0, height: "100%", width: "100%", 
              borderRadius: 10, background: "linear-gradient(to right, #f4a261, #52b788, #e76f51, #c0392b)",
              opacity: 0.3
            }} />
            <div style={{ 
              position: "absolute", left: `${bmiConfig.bar}%`, top: "50%", transform: "translate(-50%, -50%)",
              width: 22, height: 22, background: "#fff", border: `4px solid ${bmiConfig.color}`, 
              borderRadius: "50%", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "left 1s ease"
            }} />
        </div>

        <div style={{ background: bmiConfig.bg, borderRadius: 20, padding: "20px", display: "flex", gap: 15 }}>
          <span style={{ fontSize: 24 }}>💡</span>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
            <strong style={{ color: bmiConfig.color, display: "block", marginBottom: 4 }}>Recommendation:</strong>
            {profile.suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;