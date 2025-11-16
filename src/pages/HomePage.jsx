import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ikmService from '../services/ikmService'; // Impor "telepon"
import IkmCard from '../components/IkmCard'; // Impor "kartu" IKM kita
import { motion } from 'framer-motion'; // <-- 1. Impor motion

// --- 2. Tambahkan varian animasi ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
};
// --- Akhir penambahan ---


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
    <>
      {/* === (TETAP ADA) Hero Section (Full Width) === */}
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

      {/* === (BARU) Bagian 3 Keunggulan === */}
      <section className="container mx-auto text-center max-w-5xl py-16 px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Keunggulan MitraLink
        </h2>
            
        <motion.div 
          className="flex justify-center flex-wrap gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animasi saat di-scroll ke tampilan
          viewport={{ once: true, amount: 0.3 }} // Hanya animasi sekali
        >
          {/* Highlight Card 1 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-7 w-72"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          >
            {/* Saya ganti 'text-primary' menjadi 'text-blue-600' agar sesuai tema */}
            <h3 className="text-xl font-semibold text-blue-600 mb-2">🤝 Kemitraan Strategis</h3>
            <p className="text-gray-600">Hubungkan IKM Anda dengan Industri besar terverifikasi.</p>
          </motion.div>
          {/* Highlight Card 2 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-7 w-72"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">📈 Direktori Unggulan</h3>
            <p className="text-gray-600">Tampilkan produk dan profil usaha Anda di direktori kami.</p>
          </motion.div>
          {/* Highlight Card 3 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-7 w-72"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">💡 Platform Digital</h3>
            <p className="text-gray-600">Manfaatkan platform digital untuk lapor pendapatan & cari mitra.</p>
          </motion.div>
        </motion.div>
      </section>
      {/* === Akhir Bagian Baru === */}


      {/* === (TETAP ADA) Bagian IKM Unggulan === */}
      {/* Saya kurangi padding atasnya sedikit (pt-8) agar tidak terlalu jauh */}
      <div className="container mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-12 md:pb-24">
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