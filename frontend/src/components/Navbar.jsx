import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          ShopSphere
        </Link>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        {user && (
          <NavLink to="/cart">
            Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </NavLink>
        )}
      </nav>
      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </>
        )}
        {user && (
          <div className="navbar-user">
            <span className="user-name">Hi, {user.name}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

