import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardIndustryPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard Utama Industri
      </h1>
      
      <p className="text-lg mb-4">
        Halo, <span className="font-semibold">{user?.email}</span>!
      </p>
      
      <p>
        Selamat datang di portal kemitraan. Silakan gunakan menu di sebelah kiri 
        untuk mengedit profil perusahaan atau mem-posting kebutuhan (tender).
      </p>
    </div>
  );
};

export default DashboardIndustryPage;