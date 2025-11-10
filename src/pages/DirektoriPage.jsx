import React, { useState, useEffect } from 'react';
import ikmService from '../services/ikmService'; // Impor "telepon"
import IkmCard from '../components/IkmCard'; // Impor "kartu"

const DirektoriPage = () => {
  const [ikms, setIkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Ambil data IKM terverifikasi saat halaman dibuka
  useEffect(() => {
    const fetchIkms = async () => {
      try {
        const response = await ikmService.getVerifiedIkms();
        setIkms(response.data);
      } catch (err) {
        console.error('Gagal mengambil IKM', err);
        setError('Gagal memuat data IKM. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    fetchIkms();
  }, []); // [] berarti 'jalankan sekali'

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Direktori IKM Terverifikasi</h1>

      {loading && <p className="text-center">Loading data IKM...</p>}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        ikms.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada IKM yang terverifikasi.
          </p>
        ) : (
          // Tampilkan IKM dalam grid 3 kolom
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ikms.map(ikm => (
              <IkmCard key={ikm.profile_id} ikm={ikm} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default DirektoriPage;