import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // <-- Impor Navbar kita

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar /> 

      {/* Area Konten */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Sederhana */}
      <footer className="bg-gray-50 text-gray-500 p-8 text-center border-t border-gray-200 mt-16">
        © 2025 MitraLink IKM. All rights reserved.
      </footer>

    </div>
  );
};

export default MainLayout;