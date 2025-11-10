import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ikmService from '../services/ikmService'; // Impor "telepon"
import IkmCard from '../components/IkmCard'; // Impor "kartu" IKM kita

const HomePage = () => {
  const [unggulan, setUnggulan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data 3 IKM unggulan saat halaman dibuka
  useEffect(() => {
    const fetchUnggulan = async () => {
      try {
        const response = await ikmService.getUnggulanIkms();
        setUnggulan(response.data);
      } catch (err) {
        console.error('Gagal mengambil IKM Unggulan', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnggulan();
  }, []); 

  return (
    <div className="container mx-auto p-4">
      
      {/* === Hero Section (MODIFIKASI) === */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 md:py-20 text-center mb-16 shadow-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Temukan Mitra IKM Lokal Terverifikasi
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Menjembatani kebutuhan Industri Besar dengan potensi IKM 
          lokal yang siap berkembang.
        </p>
        <div className="space-x-4">
          <Link 
            to="/direktori" 
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Lihat Direktori IKM
          </Link>
          <Link 
            to="/register" 
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
          >
            Daftar Sebagai Mitra
          </Link>
        </div>
      </div>

      {/* === Bagian IKM Unggulan === */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          IKM Unggulan Terverifikasi
        </h2>
        
        {loading ? (
          <p className="text-center">Memuat IKM unggulan...</p>
        ) : unggulan.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada IKM yang terverifikasi untuk ditampilkan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unggulan.map(ikm => (
              <IkmCard key={ikm.profile_id} ikm={ikm} />
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default HomePage;