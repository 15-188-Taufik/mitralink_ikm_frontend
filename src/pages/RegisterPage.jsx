import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // (Fix typo 'L' dari kode saya sebelumnya)
import authService from '../services/authService'; // Impor "telepon" registrasi

const RegisterPage = () => {
  // Siapkan state untuk semua field di form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ikm'); // Default-nya 'ikm'
  const [namaUsaha, setNamaUsaha] = useState('');
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Untuk pesan sukses/info
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Fungsi yang dijalankan saat form di-submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Siapkan data untuk dikirim ke backend
    let data = { email, password, role };
    if (role === 'ikm') {
      data.nama_usaha = namaUsaha;
    } else {
      data.nama_perusahaan = namaPerusahaan;
    }

    try {
      // 1. Panggil "telepon" registrasi
      await authService.register(data);
      
      // 2. Jika sukses (akun baru)
      setSuccess('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
      
      // 3. Tunggu 3 detik, lalu arahkan ke halaman login
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      // --- (INI ADALAH LOGIKA BARU YANG ANDA MINTA) ---
      
      const errorMessage = err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      
      // 4. Cek apakah error-nya adalah "Email sudah terdaftar"
      if (errorMessage === 'Email sudah terdaftar') {
        
        // 5. Jika ya, ubah jadi pesan "info" (hijau)
        setSuccess('Email Anda sudah terdaftar. Mengalihkan ke halaman login...');
        
        // 6. Alihkan ke halaman login setelah 3 detik
        setTimeout(() => {
          navigate('/login');
        }, 3000);

      } else {
        // 7. Jika error lain (misal: "Nama usaha dibutuhkan"), tampilkan error merah
        setError(errorMessage);
      }
      // ------------------------------------------------
    } finally {
      setLoading(false);
    }
  };

  // Tampilan JSX (Tidak ada yang berubah di sini, tapi saya sertakan)
  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Daftar Akun Baru</h2>
        
        {/* Pesan Error atau Sukses */}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</p>}

        {/* Field Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        
        {/* Field Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>

        {/* Pilihan Role (IKM atau Industri) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Saya mendaftar sebagai:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="ikm">IKM (Usaha)</option>
            <option value="industri">Industri (Perusahaan)</option>
          </select>
        </div>

        {/* Conditional Field: Tampil jika role 'ikm' */}
        {role === 'ikm' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaUsaha">Nama Usaha</label>
            <input id="namaUsaha" type="text" value={namaUsaha} onChange={(e) => setNamaUsaha(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
        )}

        {/* Conditional Field: Tampil jika role 'industri' */}
        {role === 'industri' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaPerusahaan">Nama Perusahaan</label>
            <input id="namaPerusahaan" type="text" value={namaPerusahaan} onChange={(e) => setNamaPerusahaan(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
        )}

        {/* Tombol Submit */}
        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;