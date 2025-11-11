import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService'; 

const AdminVerifyPage = () => {
  const [ikms, setIkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    fetchUnverifiedIkms();
  }, []); 

  const handleVerify = async (id) => {
    setMessage(''); 
    try {
      const response = await adminService.verifyIkm(id);
      setMessage(response.data.message); 
      setIkms(prevIkms => prevIkms.filter(ikm => ikm.profile_id !== id));
    
    } catch (error) {
      setMessage('Gagal memverifikasi IKM. Coba lagi.');
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Verifikasi IKM</h1>
      
      {message && (
        <p className={`p-3 rounded mb-4 text-sm ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      {/* Kontainer tabel agar responsif */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-8 text-center">Loading data...</p>
        ) : ikms.length === 0 ? (
          <p className="text-center text-gray-500 p-8">
            Tidak ada IKM yang menunggu verifikasi. Kerja bagus!
          </p>
        ) : (
          /* Tambahkan div ini untuk scroll horizontal di mobile */
          <div className="overflow-x-auto">
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
                  <tr key={ikm.profile_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ikm.nama_usaha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ikm.nama_pemilik || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ikm.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleVerify(ikm.profile_id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs transition-colors"
                      >
                        Verifikasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVerifyPage;