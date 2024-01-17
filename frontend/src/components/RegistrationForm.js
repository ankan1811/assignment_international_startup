import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to your backend API
      await axios.post("http://localhost:4000/register", formData);

      // Use a relative URL
      // Handle successful registration
      console.log("Registration successful!");
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" name="username" onChange={handleChange} required />

        <label>Email: </label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />

        <label>Role: </label>
        <input type="text" name="role" onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
