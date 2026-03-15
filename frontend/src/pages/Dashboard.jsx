import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { items, total } = useCart();

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <h2>Welcome back, {user?.name}</h2>
        <p>Here&apos;s a quick overview of your account.</p>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Your Profile</h3>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
        <div className="dashboard-card">
          <h3>Cart Summary</h3>
          <p>
            <strong>Items:</strong> {items.length}
          </p>
          <p>
            <strong>Total:</strong> ₹{total.toFixed(2)}
          </p>
          <Link to="/cart" className="btn btn-full">
            View Cart
          </Link>
        </div>
      </section>
    </div>
  );
}

