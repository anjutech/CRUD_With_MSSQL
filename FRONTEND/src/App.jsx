import React from 'react'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './App.css';


const App = () => {
  const [data, setData] = useState([]);
  // Fetch data on component mount and update state whenever data changes in the database
  useEffect(() => {
    fetch('http://localhost:3000/sa')
    .then(res => res.json())
    .then(res => setData(res.recordset));
  }, [])
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/Delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update state after deletion
        setData(data.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
                     <Link className="btn btn-secondary m-2  glow-btn" to="/CreateUser">
              + Create New User 
            </Link>
      
      <table className="table  table-bordered border-warning shadow-lg border  ">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action              
               </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
              <td>
              <Link
                  className="btn btn-secondary  mx-1 glow-btn"
                  to={`/UpdateUser/${row.id}`}
                >
                  Update User
                </Link>
                <button  className="btn btn-danger   transition-btn " onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
