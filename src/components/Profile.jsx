import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      // console.log(profile);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setError("Data saved successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="profile-container">
      <div className="profile-header-row">
        <h3 className="profile-title">My Profile</h3>
        <button className="profile-btn logout" type="button" onClick={logout}>Logout</button>
      </div>
      {error && <div className="profile-error">{error}</div>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            className="profile-input"
            name="firstName"
            type="text"
            onChange={handleChange}
            defaultValue={profile.firstName}
            id="firstName"
          />
        </div>
        <div className="profile-form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="profile-input"
            name="lastName"
            type="text"
            onChange={handleChange}
            defaultValue={profile.lastName}
            id="lastName"
          />
        </div>
        <div className="profile-form-row">
          <label htmlFor="email">Email</label>
          <input
            className="profile-input"
            name="email"
            type="text"
            onChange={handleChange}
            defaultValue={profile.email}
            id="email"
          />
        </div>
        <div className="profile-form-row">
          <label htmlFor="password">Password</label>
          <input
            className="profile-input"
            name="password"
            type="password"
            onChange={handleChange}
            defaultValue={profile.password}
            id="password"
          />
        </div>
        <div className="profile-form-actions">
          <button className="profile-btn update" type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}