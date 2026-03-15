import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.tag && <span className="product-tag">{product.tag}</span>}
      </div>
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">₹{product.originalPrice}</span>
          )}
        </div>
        <button className="btn btn-full" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

