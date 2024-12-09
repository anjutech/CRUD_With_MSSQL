import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateUser = () => {
  const navigate = useNavigate();
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    try {
      // Sending data to the API
      const response = await axios.post('http://localhost:3000/CreateUser', formData);
      navigate('/');
      setResponseMessage('User created successfully!');
      setFormData({ name: '', email: '', age: '' }); // Clear form
    } catch (error) {
      console.error(error);
      setResponseMessage('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 border shadow  border-warning p-5 w-50 rounded bg-white">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Create User'}
        </button>
      </form>

      {responseMessage && (
        <div className={`alert mt-3 ${responseMessage.includes('success') ? 'alert-success' : 'alert-danger'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default CreateUser;
