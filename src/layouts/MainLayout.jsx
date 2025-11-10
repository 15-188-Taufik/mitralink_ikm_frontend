import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // <-- Impor Navbar kita

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar /> 

      {/* Area Konten */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer Sederhana */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 MitraLink IKM
      </footer>

    </div>
  );
};

export default MainLayout;