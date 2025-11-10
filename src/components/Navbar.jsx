import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Impor "Memori"

const Navbar = () => {
  // Kita cek 'memori' untuk melihat apakah ada user yang sedang login
  const { user, logout } = useAuth();

  // Fungsi untuk styling link yang aktif
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'text-white bg-blue-700 px-3 py-2 rounded-md text-sm font-medium' // Aktif
      : 'text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'; // Normal
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Judul Website */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              MitraLink IKM
            </Link>
          </div>

          {/* Menu Navigasi (Tengah) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={getNavLinkClass} end>
                Home
              </NavLink>
              
              <NavLink to="/direktori" className={getNavLinkClass}>
                Direktori IKM
              </NavLink>
              
              {/* Tampilkan link 'Dashboard' jika user sudah login */}
              {user && user.role === 'ikm' && (
                <NavLink to="/dashboard-ikm" className={getNavLinkClass}>
                  Dashboard
                </NavLink>
              )}
              {user && user.role === 'industri' && (
                <NavLink to="/dashboard-industri" className={getNavLinkClass}>
                  Dashboard
                </NavLink>
              )}
              {user && user.role === 'admin' && (
                <NavLink to="/dashboard-admin" className={getNavLinkClass}>
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>

          {/* Tombol Login/Register atau Logout (Kanan) */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                // Jika sudah login
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                // Jika belum login
                <div className="space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;