import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Komponen ikon SVG sederhana
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const IkonDashboard = () => <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6-4h.01M12 12h.01M15 15h.01M12 9h.01M9 15h.01M15 9h.01M9 12h.01" />;
const IkonDirektori = () => <Icon path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.754 18 7.5 18s3.332.523 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 18 16.5 18c-1.746 0-3.332.523-4.5 1.253" />;
const IkonProfil = () => <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m6-4h1m-1 4h1" />; // Ikon building
const IkonKebutuhan = () => <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />;
const IkonLogout = () => <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />;


const DashboardIndustryLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'flex items-center gap-3 py-2.5 px-4 rounded bg-blue-700 text-white transition-colors'
      : 'flex items-center gap-3 py-2.5 px-4 rounded text-gray-200 hover:bg-gray-700 hover:text-white transition-colors';
  };

  const NavLinkItem = ({ to, icon, label, end = false }) => (
    <NavLink 
      to={to} 
      className={getNavLinkClass} 
      onClick={() => setIsSidebarOpen(false)}
      end={end}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  const SidebarContent = () => (
    <div className="flex flex-col flex-1 h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Dashboard Industri</h2>
        <p className="text-sm text-gray-300 truncate" title={user.email}>
          {user.email}
        </p>
      </div>
      
      <nav className="mt-6 px-2 space-y-2 flex-1">
        <NavLinkItem to="/dashboard-industri" icon={<IkonDashboard />} label="Dashboard" end />
        <NavLinkItem to="/direktori" icon={<IkonDirektori />} label="Cari Direktori IKM" />
        <NavLinkItem to="/dashboard-industri/profil" icon={<IkonProfil />} label="Profil Perusahaan" />
        <NavLinkItem to="/dashboard-industri/kebutuhan" icon={<IkonKebutuhan />} label="Kelola Kebutuhan" />
      </nav>

      <div className="p-2 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 py-2.5 px-4 rounded text-red-400 hover:bg-red-700 hover:text-white transition-colors"
        >
          <IkonLogout />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* === Sidebar Overlay (Mobile) === */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* === SIDEBAR === */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-gray-100 flex-shrink-0 z-50 transform
                         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                         md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <SidebarContent />
      </aside>

      {/* === AREA KONTEN UTAMA === */}
      {/* [PERBAIKAN 1]: Tambahkan 'min-w-0' untuk mengizinkan konten menyusut */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Bar (Mobile) */}
        <header className="md:hidden bg-white shadow-md sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-600 p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-lg font-bold text-blue-600">MitraLink Industri</span>
          </div>
        </header>

        {/* Konten Halaman */}
        {/* --- PERUBAHAN DI SINI --- */}
        <main className="flex-grow bg-gray-100">
        {/* --- AKHIR PERUBAHAN --- */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardIndustryLayout;