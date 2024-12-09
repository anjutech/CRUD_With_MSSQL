import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUsers = () => {
  
  const { id } = useParams(); // Access the user ID from the URL
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [age, setAge] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/getUser/${id}`)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(err => console.log(err));
  }, [id]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate(-1); // Go to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/UpdateUser/${id}`, { name, email, age })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white shadow rounded p-4">
        <button type="button" className="btn btn-info mb-3" onClick={handleBack}>Back</button>
        <h2 className="text-center mb-4 text-info">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-info w-100" onClick={handleBack}>Update User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsers;
