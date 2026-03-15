import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.length > 0 && (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="cart-item-controls">
                    <label>
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, Number(e.target.value) || 1)
                        }
                      />
                    </label>
                    <button
                      className="btn btn-outline small"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>
              <strong>Total: ₹{total.toFixed(2)}</strong>
            </p>
            <button className="btn btn-outline" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-full" disabled>
              Checkout (demo only)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

