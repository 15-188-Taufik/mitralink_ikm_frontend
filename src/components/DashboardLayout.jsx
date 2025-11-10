import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'block py-2.5 px-4 rounded bg-blue-700 text-white'
      : 'block py-2.5 px-4 rounded hover:bg-gray-700';
  };

  return (
    <div className="flex min-h-screen">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-gray-800 text-gray-100 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard {user.role}</h2>
          <p className="text-sm">Selamat datang, {user.email}</p>
        </div>
        
        <nav className="mt-6 px-2">
          <NavLink to="/dashboard-ikm" className={getNavLinkClass} end>
            Dashboard Utama
          </NavLink>
          <NavLink to="/direktori" className={getNavLinkClass}>
            Lihat Direktori Publik
          </NavLink>
          <NavLink to="/dashboard-ikm/profil" className={getNavLinkClass}>
            Edit Profil
          </NavLink>
          <NavLink to="/dashboard-ikm/produk" className={getNavLinkClass}>
            Kelola Produk
          </NavLink>
          <NavLink to="/dashboard-ikm/pendapatan" className={getNavLinkClass}>
            Lapor Pendapatan
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full text-left mt-10 block py-2.5 px-4 rounded text-red-400 hover:bg-red-700 hover:text-white"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* === AREA KONTEN UTAMA === */}
      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;