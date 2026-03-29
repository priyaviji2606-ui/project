import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Use a local state for user or fetch directly; 
  // Note: For real-time updates across components, consider a Context API later!
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    // FIX: Match the key you use to check for the user ('user' vs 'loggedInUser')
    localStorage.removeItem("user"); 
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
    window.location.reload(); 
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", always: true },
    { to: "/profile", label: "Profile", auth: true },
    { to: "/dashboard", label: "Dashboard", auth: true },
    { to: "/menu", label: "Menu", auth: true },
    { to: "/cart", label: "Cart", auth: true },
  ];

  const visibleLinks = navLinks.filter(l => l.always || (l.auth && user));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        
        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.18s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #52b788;
          transition: width 0.22s ease;
        }
        .nav-link:hover { color: #1a1a2e; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #1a1a2e; }
        .nav-link.active::after { width: 100%; background: #1a1a2e; }

        /* FIX: Mobile Responsiveness */
        @media (max-width: 768px) {
          .desktop-links { display: none !sync; }
          .hamburger { display: flex !important; }
        }

        .mobile-menu { 
          animation: fadeDown 0.22s ease; 
        }
        @keyframes fadeDown { 
          from { opacity: 0; transform: translateY(-8px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>

      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.98)" : "#fff",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #eeeeee" : "1px solid #f0f0f0",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.04)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          >
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 18 }}>🥗</span>
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700, color: "#1a1a2e",
            }}>NutriSmart</span>
          </div>

          {/* Desktop Links */}
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {visibleLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <Link to="/login" style={{
                background: "#1a1a2e", color: "#fff", fontSize: 13, fontWeight: 700,
                padding: "10px 24px", borderRadius: 12, textDecoration: "none",
              }}> Login </Link>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 36, height: 36,
                  background: "linear-gradient(135deg, #52b788, #2d6a4f)",
                  borderRadius: "50%", display: "flex", alignItems: "center", 
                  justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff",
                }}>
                  {(user?.name || user?.email || "U")[0].toUpperCase()}
                </div>
                <button onClick={handleLogout} style={{
                  background: "none", border: "1.5px solid #e8e8e8", borderRadius: 10,
                  padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#c0392b", cursor: "pointer"
                }}> Logout </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              display: "none", background: "none", border: "none", 
              flexDirection: "column", gap: 5, cursor: "pointer"
            }}
          >
            <span style={{ width: 24, height: 2, background: "#1a1a2e", transform: menuOpen ? "rotate(45deg) translateY(10px)" : "" }} />
            <span style={{ width: 24, height: 2, background: "#1a1a2e", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 24, height: 2, background: "#1a1a2e", transform: menuOpen ? "rotate(-45deg) translateY(-10px)" : "" }} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mobile-menu" style={{
            background: "#fff", padding: "20px 24px", display: "flex",
            flexDirection: "column", gap: 16, borderTop: "1px solid #f5f5f5"
          }}>
            {visibleLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                className={`nav-link${isActive(link.to) ? " active" : ""}`}
                style={{ fontSize: 18 }}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={handleLogout} style={{
                textAlign: "left", background: "none", border: "none",
                color: "#c0392b", fontWeight: 700, padding: "10px 0"
              }}>Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                background: "#1a1a2e", color: "#fff", textAlign: "center",
                padding: "12px", borderRadius: 12, textDecoration: "none"
              }}>Login</Link>
            )}
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding under fixed nav */}
      <div style={{ height: 70 }} />
    </>
  );
}

export default Navbar;