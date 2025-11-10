import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardAdminPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard Utama Admin
      </h1>

      <p className="text-lg mb-4">
        Halo, <span className="font-semibold">{user?.email}</span>!
      </p>

      <p>
        Selamat datang di Panel Admin. Anda memiliki hak akses tertinggi.
        Gunakan menu di sebelah kiri untuk mengelola platform.
      </p>
    </div>
  );
};

export default DashboardAdminPage;