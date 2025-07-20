import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Products.css";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [searchVal, setSearchVal] = useState("");
  const [editId, setEditId] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async (pageNum = 1) => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products?page=${pageNum}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      const result = await axios.delete(url);
      setError("User Deleted Successfully");
      fetchProducts(page);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      const result = await axios.post(url, form);
      setError("User added succesfully");
      fetchProducts(page);
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...form,
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      const result = await axios.patch(url, form);
      fetchProducts(page);
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };
  return (
    <div className="products-page">
      <h2 className="products-title">Product Management</h2>
      {error && <div className="products-error">{error}</div>}
      <div className="products-form-section">
        <form ref={frmRef} className="products-form">
          <input
            name="productName"
            value={form.productName}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image Url"
            onChange={handleChange}
            required
          />
          {editId ? (
            <>
              <button className="products-btn update" onClick={handleUpdate}>Update</button>
              <button className="products-btn cancel" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="products-btn add" onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>
      <div className="products-search-section">
        <input className="products-search-input" type="text" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search products..." />
        <button className="products-btn search" onClick={() => fetchProducts(page)}>Search</button>
      </div>
      <div className="products-grid">
        {products.map((value) => (
          <div className="product-card" key={value._id}>
            <div className="product-image-wrapper">
              {value.imgUrl ? (
                <img
                  className="product-image"
                  src={
                    value.imgUrl.startsWith('/') || value.imgUrl.startsWith('http')
                      ? value.imgUrl
                      : '/' + value.imgUrl
                  }
                  alt={value.productName}
                />
              ) : (
                <div className="product-image-placeholder">No Image</div>
              )}
            </div>
            <div className="product-info">
              <div className="product-name">{value.productName}</div>
              <div className="product-description">{value.description}</div>
              <div className="product-price">${value.price}</div>
            </div>
            <div className="product-actions">
              <button className="products-btn edit" onClick={() => handleEdit(value)}>Edit</button>
              <button className="products-btn delete" onClick={() => handleDelete(value._id)}>
                Delete
              </button>
            </div>
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