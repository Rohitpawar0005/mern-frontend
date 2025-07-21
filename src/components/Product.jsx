import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;
  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const toastTimeout = useRef();

  const fetchProducts = async (pageNum = 1) => {
    try {
      const url = `${API_URL}/api/products/all?page=${pageNum}&limit=${limit}`;
      const result = await axios.get(url);
      setProducts(result.data.products);  
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line
  }, [page]);

  const showAddToCartToast = () => {
    setShowToast(false);
    setToastKey((k) => k + 1);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setTimeout(() => {
      setShowToast(true);
      toastTimeout.current = setTimeout(() => setShowToast(false), 2000);
    }, 50);
  };

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (found) {
      // Increment quantity
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
    } else {
      product.qty = 1;
      setCart([...cart, product]);
    }
    showAddToCartToast();
  };
  return (
    <div className="products-page">
      {showToast && (
        <div className="toast-notification" key={toastKey}>
          <span className="toast-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#43a047"/>
              <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Product added to cart!
        </div>
      )}
      {error && <div className="products-error">{error}</div>}
      <div className="products-grid">
        {products &&
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image-wrapper">
                {product.imgUrl ? (
                  <img
                    className="product-image"
                    src={
                      product.imgUrl.startsWith("/") || product.imgUrl.startsWith("http")
                        ? product.imgUrl
                        : "/" + product.imgUrl
                    }
                    alt={product.productName}
                  />
                ) : (
                  <div className="product-image-placeholder">No Image</div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-description">{product.description}</p>
                <h4 className="product-price">₹{product.price}</h4>
              </div>
              <button className="products-btn add" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
      </div>
      <div className="products-pagination">
        <button
          className="products-btn nav"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="products-btn nav"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <div className="products-page-info">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}