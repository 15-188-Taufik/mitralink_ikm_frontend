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
    // Hapus <div className="container mx-auto p-4"> yang membungkus semuanya
    <>
      {/* === Hero Section (Full Width) === */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl">
        {/* Container untuk konten di dalam Hero */}
        <div className="container mx-auto max-w-7xl px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Temukan Mitra IKM Lokal Terverifikasi
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Menjembatani kebutuhan Industri Besar dengan potensi IKM 
            lokal yang siap berkembang.
          </p>
          
          {/* Wrapper tombol yang responsif */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/direktori" 
              className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Lihat Direktori IKM
            </Link>
            <Link 
              to="/register" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
            >
              Daftar Sebagai Mitra
            </Link>
          </div>
        </div>
      </div>

      {/* === Bagian IKM Unggulan (Dengan Container Sendiri) === */}
      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          IKM Unggulan Terverifikasi
        </h2>
        
        {loading ? (
          <p className="text-center text-gray-600">Memuat IKM unggulan...</p>
        ) : unggulan.length === 0 ? (
          <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="font-medium">Belum Ada IKM Unggulan</p>
            <p className="text-sm">Belum ada IKM yang terverifikasi untuk ditampilkan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unggulan.map(ikm => (
              <IkmCard key={ikm.profile_id} ikm={ikm} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;