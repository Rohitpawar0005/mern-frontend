import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Products.css";

export default function ShopProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const { cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div className="products-page">
      <h2 className="products-title">Shop Products</h2>
      {error && <div className="products-error">{error}</div>}
      <div className="products-grid">
        {products && products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image-wrapper">
              {product.imgUrl ? (
                <img
                  className="product-image"
                  src={
                    product.imgUrl.startsWith('/') || product.imgUrl.startsWith('http')
                      ? product.imgUrl
                      : '/' + product.imgUrl
                  }
                  alt={product.productName}
                />
              ) : (
                <div className="product-image-placeholder">No Image</div>
              )}
            </div>
            <div className="product-info">
              <div className="product-name">{product.productName}</div>
              <div className="product-description">{product.description}</div>
              <div className="product-price">${product.price}</div>
            </div>
            <button className="products-btn add" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 