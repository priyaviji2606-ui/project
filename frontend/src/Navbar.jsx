import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
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
          letter-spacing: 0.01em;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #52b788;
          border-radius: 99px;
          transition: width 0.22s ease;
        }
        .nav-link:hover { color: #1a1a2e; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #1a1a2e; }
        .nav-link.active::after { width: 100%; background: #1a1a2e; }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .mobile-menu { animation: fadeDown 0.22s ease; }
      `}</style>

      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        fontFamily: "'DM Sans', sans-serif",
        background: scrolled ? "rgba(255,255,255,0.96)" : "#fff",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #eeeeee" : "1px solid #f0f0f0",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          height: 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
            }}
          >
            <div style={{
              width: 34, height: 34,
              background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
              borderRadius: 9,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 17 }}>🥗</span>
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 700, color: "#1a1a2e",
            }}>NutriSmart</span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {visibleLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Button */}
            {!user ? (
              <Link
                to="/login"
                style={{
                  background: "#1a1a2e",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "8px 20px",
                  borderRadius: 10,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "background 0.18s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => e.target.style.background = "#2d6a4f"}
                onMouseLeave={e => e.target.style.background = "#1a1a2e"}
              >
                Login
              </Link>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* Avatar */}
                <div style={{
                  width: 34, height: 34,
                  background: "linear-gradient(135deg, #52b788, #2d6a4f)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: "#fff",
                  flexShrink: 0,
                }}>
                  {(user?.name || user?.email || "U")[0].toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "1.5px solid #e8e8e8",
                    borderRadius: 10,
                    padding: "7px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#c0392b",
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "all 0.18s ease",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = "#c0392b";
                    e.target.style.color = "#fff";
                    e.target.style.borderColor = "#c0392b";
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "none";
                    e.target.style.color = "#c0392b";
                    e.target.style.borderColor = "#e8e8e8";
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              flexDirection: "column", gap: 5, padding: 4,
            }}
            className="hamburger"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2,
                background: "#1a1a2e", borderRadius: 2,
                transition: "all 0.2s ease",
              }} />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              borderTop: "1px solid #f0f0f0",
              background: "#fff",
              padding: "16px 40px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {visibleLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 16 }}
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <Link to="/login" onClick={() => setMenuOpen(false)}
                style={{
                  background: "#1a1a2e", color: "#fff", padding: "10px 20px",
                  borderRadius: 10, textDecoration: "none", fontWeight: 700,
                  fontSize: 14, textAlign: "center"
                }}>
                Login
              </Link>
            ) : (
              <button onClick={handleLogout}
                style={{
                  background: "none", border: "1.5px solid #e8e8e8",
                  borderRadius: 10, padding: "9px 16px",
                  fontSize: 14, fontWeight: 700, color: "#c0392b", cursor: "pointer",
                  textAlign: "left", fontFamily: "'DM Sans', sans-serif"
                }}>
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;