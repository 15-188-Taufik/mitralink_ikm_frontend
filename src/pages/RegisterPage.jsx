import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; 

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ikm'); 
  const [namaUsaha, setNamaUsaha] = useState('');
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    let data = { email, password, role };
    if (role === 'ikm') {
      data.nama_usaha = namaUsaha;
    } else {
      data.nama_perusahaan = namaPerusahaan;
    }

    try {
      await authService.register(data);
      // --- PERUBAHAN PESAN SUKSES ---
      setSuccess('Registrasi berhasil! Silakan cek email Anda untuk verifikasi. Anda akan diarahkan ke halaman login.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      if (errorMessage === 'Email sudah terdaftar') {
        setSuccess('Email Anda sudah terdaftar. Mengalihkan ke halaman login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-16 sm:py-24">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Daftar Akun Baru
        </h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center text-sm">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                 className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                 className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Saya mendaftar sebagai:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} 
                  className="form-select block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="ikm">IKM (Usaha)</option>
            <option value="industri">Industri (Perusahaan)</option>
          </select>
        </div>

        {role === 'ikm' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaUsaha">Nama Usaha</label>
            <input id="namaUsaha" type="text" value={namaUsaha} onChange={(e) => setNamaUsaha(e.target.value)} required 
                   className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
        )}

        {role === 'industri' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaPerusahaan">Nama Perusahaan</label>
            <input id="namaPerusahaan" type="text" value={namaPerusahaan} onChange={(e) => setNamaPerusahaan(e.target.value)} required 
                   className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <button type="submit" disabled={loading} 
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition-colors">
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;