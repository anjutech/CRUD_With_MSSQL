import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18+
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import App from './App';
import Header from './Header';
import CreateUser from './assets/CreateUser';
import UpdateUser from './assets/UpdateUser';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for React 18

root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/CreateUser" element={<CreateUser />} />
      <Route path="/UpdateUser/:id" element={<UpdateUser />} />
    </Routes>
  </BrowserRouter>
);
