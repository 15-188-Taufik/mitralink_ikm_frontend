import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ikmService from '../services/ikmService';
import { useAuth } from '../context/AuthContext'; // Impor "Memori"

const IkmDetailPage = () => {
  // 1. Ambil 'id' dari URL (misal: /direktori/1)
  const { id } = useParams(); 
  // 2. Cek "Memori" untuk lihat role user
  const { user } = useAuth(); 

  const [ikm, setIkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIkmDetail = async () => {
      try {
        const response = await ikmService.getPublicIkmById(id);
        setIkm(response.data);
      } catch (err) {
        setError('Gagal memuat data IKM. Mungkin IKM tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };
    fetchIkmDetail();
  }, [id]); // Jalankan ulang jika 'id' di URL berubah

  // Tampilan Loading
  if (loading) return <p className="text-center p-10">Loading detail IKM...</p>;
  // Tampilan Error
  if (error) return <p className="text-center p-10 text-red-600">{error}</p>;
  // Tampilan Jika IKM tidak ditemukan
  if (!ikm) return <p className="text-center p-10">IKM tidak ditemukan.</p>;

  // Tampilan Halaman Detail
  return (
    <div className="container mx-auto p-4">

      {/* Bagian Header Profil */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Foto Profil */}
          <img 
            src={ikm.foto_url || 'https://via.placeholder.com/300x300.png?text=Foto+Profil'} 
            alt={ikm.nama_usaha}
            className="w-full md:w-1/3 h-64 object-cover rounded-lg"
          />
          {/* Info Utama */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{ikm.nama_usaha}</h1>
            <p className="text-xl text-gray-700 mb-4">Oleh: {ikm.nama_pemilik || 'Belum diisi'}</p>
            <p className="text-gray-600 mb-4">{ikm.deskripsi || 'Belum ada deskripsi.'}</p>
            <p className="text-gray-800 font-medium">
              <span className="font-bold">Alamat:</span> {ikm.alamat || 'Belum diisi'}
            </p>

            {/* --- PERUBAHAN: E-COMMERCE TAMPIL UNTUK PUBLIK --- */}
            <p className="mt-4">
              <span className="font-bold">E-commerce:</span> 
              {ikm.link_ecommerce ? (
                <a 
                  href={ikm.link_ecommerce} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline ml-1"
                >
                  Kunjungi Toko
                </a>
              ) : ' Belum diisi'}
            </p>
            {/* --- AKHIR PERUBAHAN --- */}


            {/* === MODEL HIBRIDA (RAHASIA) === */}
            <div className="bg-gray-100 p-4 rounded-lg mt-6">
              <h3 className="text-lg font-semibold mb-2">Kontak Kemitraan</h3>
              
              {/* --- PERUBAHAN: Cek 'user' (login) saja, bukan role 'industri' --- */}
              {user ? (
                // TAMPILKAN INI JIKA USER SUDAH LOGIN (ROLE APAPUN)
                <div>
                  <p>
                    <span className="font-bold">No. HP:</span> {ikm.no_hp || 'Belum diisi'}
                  </p>
                  {/* Link E-commerce sudah dipindah ke luar */}
                </div>
              ) : (
                // TAMPILKAN INI JIKA PENGUNJUNG BIASA ATAU IKM
                <div className="text-center p-4 bg-gray-200 rounded">
                  <p className="font-medium">Kontak No. HP hanya terlihat oleh mitra yang sudah login.</p>
                  <p className="text-sm">
                    Silakan <Link to="/login" className="text-blue-600 font-bold">Login</Link> atau 
                    <Link to="/register" className="text-blue-600 font-bold"> Daftar</Link> untuk melihat.
                  </p>
                </div>
              )}
              {/* --- AKHIR PERUBAHAN --- */}
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Daftar Produk */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Produk Unggulan</h2>
        {ikm.products.length === 0 ? (
          <p>IKM ini belum mengunggah produk.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ikm.products.map(product => (
              <div key={product.product_id} className="border rounded-lg overflow-hidden shadow-md">
                <img 
                  src={product.foto_produk_url}
                  alt={product.nama_produk}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.nama_produk}</h3>
                  <p className="text-gray-600">{product.deskripsi_produk}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IkmDetailPage;