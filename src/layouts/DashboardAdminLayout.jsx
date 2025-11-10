import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardAdminLayout = () => {
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
      {/* === SIDEBAR (Versi Admin) === */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm">Selamat datang, {user.email}</p>
        </div>
        
        <nav className="mt-6 px-2">
          <NavLink to="/dashboard-admin" className={getNavLinkClass} end>
            Dashboard Utama
          </NavLink>
          <NavLink to="/direktori" className={getNavLinkClass}>
            Lihat Direktori Publik
          </NavLink>
          <NavLink to="/dashboard-admin/verifikasi" className={getNavLinkClass}>
            Verifikasi IKM
          </NavLink>
          <NavLink to="/dashboard-admin/laporan" className={getNavLinkClass}>
            Laporan Pendapatan
          </NavLink>

          {/* Tombol Logout */}
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

export default DashboardAdminLayout;