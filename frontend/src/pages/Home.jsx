import { useEffect, useState } from "react";
import { apiClient } from "../services/apiClient.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get("/products");
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Shop the Latest Electronics & Fashion</h1>
          <p>Discover curated deals and top brands, all in one place.</p>
          <a href="#products" className="btn btn-full">
            Browse Products
          </a>
        </div>
        <div className="hero-banner">
          <div className="hero-card primary">
            <h2>Big Billion Days</h2>
            <p>Up to 70% off on smartphones & laptops.</p>
          </div>
          <div className="hero-card secondary">
            <h3>Fashion Fiesta</h3>
            <p>Trendy outfits starting at just ₹499.</p>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Handpicked items just for you.</p>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p className="error-text">{error}</p>}
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
          {!loading && !error && products.length === 0 && (
            <p>No products available. Check back later.</p>
          )}
        </div>
      </section>
    </div>
  );
}

