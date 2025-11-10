import React from 'react';
import { useAuth } from '../context/AuthContext'; // Impor "Memori"

const DashboardIkmPage = () => {
  // Kita hanya ambil 'user' untuk menyapa
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard Utama
      </h1>
      
      <p className="text-lg mb-4">
        Halo, <span className="font-semibold">{user?.email}</span>!
      </p>
      
      <p>
        Selamat datang di pusat kendali Anda. Silakan gunakan menu di sebelah kiri 
        untuk mengedit profil, mengelola produk, atau melaporkan pendapatan.
      </p>
    </div>
  );
};

export default DashboardIkmPage;