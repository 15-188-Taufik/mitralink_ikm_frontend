import React from 'react';
import { Link } from 'react-router-dom';

// Komponen ini menerima 1 'ikm' sebagai properti
const IkmCard = ({ ikm }) => {
  // Foto placeholder jika IKM belum unggah foto
  const foto = ikm.foto_url || 'https://via.placeholder.com/400x300.png?text=Foto+IKM';

  return (
    // --- PERUBAHAN 1: 'div' terluar diubah menjadi 'Link' ---
    // Semua style dari div dipindahkan ke Link ini
    <Link 
      to={`/direktori/${ikm.profile_id}`} 
      className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden flex flex-col 
                 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group" // Tambahkan 'group'
    >
      
      {/* Bagian Gambar */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={foto} 
          alt={ikm.nama_usaha} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Bagian Teks */}
      <div className="p-5 flex-grow">
        {/* Kategori (jika ada) */}
        {ikm.kategori && (
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold tracking-wide">
            {ikm.kategori}
          </span>
        )}
        <h3 className="text-xl font-bold mt-2 mb-1 truncate text-gray-900">{ikm.nama_usaha}</h3>
        {/* line-clamp-2 membatasi alamat jadi 2 baris */}
        <p className="text-sm text-gray-600 line-clamp-2">{ikm.alamat || 'Alamat belum diisi'}</p>
      </div>

      {/* Bagian Link/Tombol */}
      {/* Tambahkan 'mt-auto' agar footer ini selalu di bawah */}
      <div className="p-5 bg-gray-50 border-t border-gray-100 mt-auto"> 
        {/* --- PERUBAHAN 2: 'Link' di dalam sini diubah menjadi 'span' --- */}
        {/* Teks ini sekarang hanya hiasan, karena link-nya sudah ada di 'group' */}
        <span 
          className="text-blue-600 group-hover:text-blue-800 font-semibold text-sm"
        >
          Lihat Detail <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
        </span>
        {/* --- AKHIR PERUBAHAN 2 --- */}
      </div>
    </Link> // --- AKHIR PERUBAHAN 1 ---
  );
};

export default IkmCard;