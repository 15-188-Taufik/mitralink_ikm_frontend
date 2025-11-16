import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(''); 
    setLoading(true); 

    try {
      const response = await login(email, password);
      
      const userRole = response.data.user.role;
      if (userRole === 'ikm') {
        navigate('/dashboard-ikm');
      } else if (userRole === 'industri') {
        navigate('/dashboard-industri');
      } else if (userRole === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/'); 
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false); 
    }
  };

  // const handleGoogleLogin = async () => {
  //   // Logika untuk Google Login perlu dibuat di sini dan di AuthContext
  //   // Ini membutuhkan setup API di Backend
  //   console.log('Fungsi Google Login belum diimplementasikan');
  // };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-16 sm:py-24">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login Akun
        </h2>
        
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="email@anda.com"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>

        {/* --- TAMBAHKAN PEMISAH DAN TOMBOL GOOGLE --- */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Atau
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            // onClick={handleGoogleLogin} // Fungsi ini perlu dibuat dan dihubungkan ke API
            disabled={loading}
            className="w-full flex justify-center items-center gap-3 bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-50 disabled:bg-gray-100"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.1 6.25C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#34A853" d="M46.94 24.55c0-1.57-.14-3.09-.41-4.55H24v8.51h12.8c-.55 3.19-2.16 5.9-4.75 7.74l6.8 5.29c3.97-3.66 6.15-8.9 6.15-15.09z"></path>
              <path fill="#FBBC05" d="M10.66 28.72c-.76-2.29-1.19-4.75-1.19-7.22s.43-4.93 1.2-7.22L2.56 8.03C.96 11.66 0 15.69 0 20s.96 8.34 2.56 11.97l8.1-5.25z"></path>
              <path fill="#EA4335" d="M24 48c6.47 0 11.94-2.13 15.9-5.74l-6.8-5.29c-2.11 1.41-4.8 2.25-7.6 2.25-6.26 0-11.57-4.22-13.47-9.91l-8.1 6.25C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            Login dengan Google
          </button>
        </div>
        {/* --- AKHIR TAMBAHAN --- */}
      </form>
    </div>
  );
};

export default LoginPage;