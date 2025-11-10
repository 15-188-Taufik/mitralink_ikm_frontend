import React, { createContext, useState, useContext } from 'react';
import api from '../services/api'; // "Telepon" kita

// 1. Buat "Cetakan" Context
const AuthContext = createContext();

// 2. Buat "Provider" (Penyedia) yang akan membungkus aplikasi kita
export const AuthProvider = ({ children }) => {
  // 3. Siapkan "state" (memori) untuk menyimpan data user
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  });

  // 4. Buat fungsi LOGIN
  const login = async (email, password) => {
    try {
      // Panggil API Login dari backend
      const response = await api.post('/auth/login', { email, password });
      
      // Jika berhasil, ambil data dan token
      const { user, token } = response.data;
      
      // Simpan data ke "state" (memori)
      setAuth({ user, token });
      
      // Simpan juga ke Local Storage (agar tidak hilang saat refresh)
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      return response; // Berhasil
    } catch (error) {
      // Jika gagal, lempar error agar halaman login bisa menanganinya
      throw error;
    }
  };

  // 5. Buat fungsi LOGOUT
  const logout = () => {
    // Hapus data dari "state" (memori)
    setAuth({ user: null, token: null });
    
    // Hapus data dari Local Storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 6. Sediakan "memori" dan "fungsi" ini ke seluruh aplikasi
  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 7. Buat "Hook" kustom agar mudah digunakan di komponen lain
export const useAuth = () => {
  return useContext(AuthContext);
};