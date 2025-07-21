import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Orders.css";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [status, page]);
  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="orders-container">
      <h2 className="orders-title">Order Management</h2>
      {error && <div className="orders-error">{error}</div>}
      <div className="orders-filter-section">
        <select className="orders-filter-select" onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <ul className="orders-list">
        {orders && orders.map((order) => (
          <li className="orders-card" key={order._id}>
            <div className="orders-row">
              <span className="orders-id">{order._id}</span>
              <span className={`orders-status badge ${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <div className="orders-value">₹{order.orderValue}</div>
            {order.status === "Pending" && (
              <div className="orders-actions">
                <button className="orders-btn cancel" onClick={() => updateOrder("cancelled", order._id)}>
                  Cancel
                </button>
                <button className="orders-btn complete" onClick={() => updateOrder("completed", order._id)}>
                  Complete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="orders-pagination">
        <button
          className="orders-btn page prev"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="orders-btn page next"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <div className="orders-page-info">Page {page} of {totalPages}</div>
    </div>
  );
}