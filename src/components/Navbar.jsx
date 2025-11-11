import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'text-white bg-blue-700 px-3 py-2 rounded-md text-sm font-medium'
      : 'text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
  };
  
  const getMobileNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-700'
      : 'block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-blue-700';
  };
  
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Tutup menu saat logout
  }

  return (
    <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Judul Website */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              MitraLink IKM
            </Link>
          </div>

          {/* Menu Navigasi (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={getNavLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/direktori" className={getNavLinkClass}>
                Direktori IKM
              </NavLink>
              
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

          {/* Tombol Login/Register atau Logout (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              ) : (
                <div className="space-x-2">
                  <Link
                    to="/login"
                    className="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Menu Hamburger (Mobile) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Panel Menu Mobile */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-blue-700`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={getMobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)} end>
            Home
          </NavLink>
          <NavLink to="/direktori" className={getMobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
            Direktori IKM
          </NavLink>
          
          {user && user.role === 'ikm' && (
            <NavLink to="/dashboard-ikm" className={getMobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {user && user.role === 'industri' && (
            <NavLink to="/dashboard-industri" className={getMobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {user && user.role === 'admin' && (
            <NavLink to="/dashboard-admin" className={getMobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
        </div>
        
        {/* Tombol Login/Logout di Mobile */}
        <div className="pt-3 pb-3 border-t border-blue-700">
          {user ? (
            <div className="px-5">
              <p className="text-sm text-blue-200 mb-2">Login sebagai: {user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;