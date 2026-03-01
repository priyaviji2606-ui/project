import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-green-600">NutriSmart</h1>

      <div className="space-x-6 font-medium">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;