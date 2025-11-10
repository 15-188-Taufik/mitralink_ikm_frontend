import React from 'react';
import { Link } from 'react-router-dom';

// Komponen ini menerima 1 'ikm' sebagai properti
const IkmCard = ({ ikm }) => {
  // Foto placeholder jika IKM belum unggah foto
  const foto = ikm.foto_url || 'https://via.placeholder.com/400x300.png?text=Foto+IKM';

  return (
    // Efek hover
    <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col 
                   transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
      
      {/* Bagian Gambar */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={foto} 
          alt={ikm.nama_usaha} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Bagian Teks */}
      <div className="p-4 flex-grow">
        {/* Kategori (jika ada) */}
        {ikm.kategori && (
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold tracking-wide">
            {ikm.kategori}
          </span>
        )}
        <h3 className="text-xl font-bold mt-2 mb-1 truncate">{ikm.nama_usaha}</h3>
        <p className="text-sm text-gray-600">{ikm.alamat || 'Alamat belum diisi'}</p>
      </div>

      {/* Bagian Link/Tombol */}
      <div className="p-4 bg-gray-50 border-t">
        <Link 
          to={`/direktori/${ikm.profile_id}`} 
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          Lihat Detail &rarr;
        </Link>
      </div>
    </div>
  );
};

export default IkmCard;