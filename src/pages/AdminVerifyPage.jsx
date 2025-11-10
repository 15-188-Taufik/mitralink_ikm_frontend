import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService'; // Impor "telepon" Admin

const AdminVerifyPage = () => {
  // State untuk menyimpan daftar IKM yang belum terverifikasi
  const [ikms, setIkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. Fungsi untuk mengambil data IKM
  const fetchUnverifiedIkms = async () => {
    setLoading(true);
    try {
      const response = await adminService.getUnverifiedIkms();
      setIkms(response.data);
    } catch (error) {
      console.error('Gagal mengambil data IKM', error);
      setMessage('Gagal memuat data IKM yang perlu diverifikasi.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Ambil data saat halaman dibuka
  useEffect(() => {
    fetchUnverifiedIkms();
  }, []); // [] berarti 'jalankan sekali'

  // 3. Fungsi untuk menangani klik "Verifikasi"
  const handleVerify = async (id) => {
    setMessage(''); // Hapus pesan lama
    try {
      // Panggil API untuk verifikasi
      const response = await adminService.verifyIkm(id);
      setMessage(response.data.message); // Tampilkan pesan sukses

      // Hapus IKM yang baru diverifikasi dari daftar (UI)
      setIkms(prevIkms => prevIkms.filter(ikm => ikm.profile_id !== id));
    
    } catch (error) {
      setMessage('Gagal memverifikasi IKM. Coba lagi.');
    }
  };

  // 4. Tampilan (JSX)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Verifikasi IKM</h1>
      
      {message && (
        <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      {/* Tabel IKM */}
      <div className="bg-white shadow-md rounded p-8">
        {loading ? (
          <p>Loading data...</p>
        ) : ikms.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada IKM yang menunggu verifikasi. Kerja bagus!</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Usaha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pemilik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ikms.map((ikm) => (
                <tr key={ikm.profile_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{ikm.nama_usaha}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ikm.nama_pemilik || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ikm.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleVerify(ikm.profile_id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Verifikasi Sekarang
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminVerifyPage;