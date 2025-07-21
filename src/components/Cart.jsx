import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    if (qty <= 1) {
      // Remove product from cart
      setCart(cart.filter((product) => product._id !== id));
    } else {
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([])
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const totalItems = cart.reduce((sum, value) => sum + value.qty, 0);

  return (
    <div className="cart-container-modern">
      <div className="cart-header-row">
        <h2 className="cart-title-modern">My Cart</h2>
        <span className="cart-items-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
      </div>
      {error && <div className="cart-error">{error}</div>}
      <div className="cart-list-modern">
        {cart && cart.filter(value => value.qty > 0).map((value, idx) => (
          <div className="cart-item-modern" key={value._id}>
            <img
              className="cart-product-image-modern"
              src={
                value.imgUrl && (value.imgUrl.startsWith("/") || value.imgUrl.startsWith("http"))
                  ? value.imgUrl
                  : "/" + value.imgUrl
              }
              alt={value.productName}
            />
            <div className="cart-product-info-modern">
              <div className="cart-product-name-modern">{value.productName}</div>
              {value.size && <div className="cart-product-size">Size: <b>{value.size}</b></div>}
              <div className="cart-qty-row">
                <span className="cart-qty-label">Quantity</span>
                <div className="cart-qty-group">
                  <button className="cart-btn qty-btn-modern" onClick={() => decrement(value._id, value.qty)}>-</button>
                  <input className="cart-qty-input" type="text" value={value.qty} readOnly />
                  <button className="cart-btn qty-btn-modern" onClick={() => increment(value._id, value.qty)}>+</button>
                </div>
              </div>
            </div>
            <div className="cart-product-price-modern">₹{value.price * value.qty}</div>
          </div>
        ))}
      </div>
      <div className="cart-price-details">
        <h3 className="cart-price-title">Price Details</h3>
        <div className="cart-price-row"><span>Total No. of Items</span><span>{totalItems}</span></div>
        <div className="cart-price-row"><span>Total MRP Value</span><span>₹{orderValue}</span></div>
        {/* Add more price details as needed */}
        <div className="cart-price-row cart-price-total"><span>Sub Total</span><span>₹{orderValue}</span></div>
      </div>
      <div className="cart-actions-modern">
        {user?.token ? (
          <button className="cart-btn place-order-btn-modern" onClick={placeOrder}>Place Order</button>
        ) : (
          <button className="cart-btn login-btn-modern" onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </div>
    </div>
  );
}