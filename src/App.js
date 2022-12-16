import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import NavBar from './components/Navbar/navbar';
import Register from './pages/Register/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import PrivateBackofficeRoute from './utils/PrivateRoute';
import AdminLoginPage from './pages/Login/AdminLoginPage';


function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLoginPage />}></Route>
        <Route path="/admin/login" element={
          <PrivateBackofficeRoute>

          </PrivateBackofficeRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
