import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// import Footer from './components/Footer/Footer';
// import NavBar from './components/Navbar/navbar';
// import Register from './pages/Register/RegisterPage';
// import { AuthProvider } from './context/AuthContext';
// import Home from './pages/Home/HomePage';
// import LoginPage from './pages/Login/LoginPage';
// import AllAdminRoutes from './routes/AllRoutes';
// import AdminLoginPage from './pages/Login/AdminLoginPage'
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
  <div>
    <AllRoutes />
  </div>
  );
}

export default App;

// {/* <BrowserRouter>
// <AuthProvider>
//   <NavBar />
//   <Routes>
//     <Route path="/home" element={<Home />} />
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="*" element={<Navigate to="/home" />} />
//     <Route path="/admin/login" element={
//       <AdminLoginPage />} />
//     <Route path="/admin" element={
//       <AllAdminRoutes />
//     } />
//   </Routes>
//   <Footer />
// </AuthProvider>
// </BrowserRouter> */}
