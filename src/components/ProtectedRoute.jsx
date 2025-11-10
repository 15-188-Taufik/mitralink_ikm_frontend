import React from 'react';
import { useAuth } from '../context/AuthContext'; // Impor "Memori" kita
import { Navigate, Outlet } from 'react-router-dom';

// Komponen ini akan menerima 'role' yang diizinkan (misal: 'ikm')
const ProtectedRoute = ({ allowedRoles }) => {
  // 1. Cek "Memori" kita: siapa yang sedang login?
  const { user, token } = useAuth();

  // 2. Cek Skenario 1: Apakah user TIDAK login?
  if (!token) {
    // Jika tidak login, lempar kembali ke halaman login
    return <Navigate to="/login" replace />;
  }

  // 3. Cek Skenario 2: Apakah user login, TAPI role-nya salah?
  if (!allowedRoles.includes(user.role)) {
    // Jika role salah, lempar ke homepage
    return <Navigate to="/" replace />;
  }

  // 4. Cek Skenario 3: Jika user login DAN role-nya benar
  // Tampilkan halaman yang dia tuju (misal: Dashboard IKM)
  return <Outlet />;
};

export default ProtectedRoute;