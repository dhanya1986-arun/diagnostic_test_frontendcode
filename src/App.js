


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import LoginForm from './components/LoginForm';
//import UploadPrescription from './components/UploadPrescription';
//import AdminPanel from './Pages/AdminPanel';
import Login  from './Pages/Login';
import Register from './Pages/Register';
import UserDashboard  from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard ';

function App() {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
             <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
       {/*} <Route path="/" element={<LoginForm />} />
        <Route path="/upload" element={<UploadPrescription />} />
        <Route path="/admin" element={<AdminPanel />} />

     */} </Routes>
    </Router>
  );
}

export default App;
