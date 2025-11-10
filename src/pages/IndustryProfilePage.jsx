import React, { useState, useEffect } from 'react';
import industryService from '../services/industryService'; // Impor "telepon" Industri

const IndustryProfilePage = () => {
  // Siapkan state untuk form
  const [formData, setFormData] = useState({
    nama_perusahaan: '',
    sektor_industri: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Ambil data profil saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await industryService.getMyProfile();
        // Isi form dengan data yang ada di database
        setFormData({
          nama_perusahaan: response.data.nama_perusahaan || '',
          sektor_industri: response.data.sektor_industri || '',
        });
      } catch (error) {
        console.error('Gagal mengambil profil', error);
        setMessage('Gagal mengambil data profil.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); // [] berarti 'jalankan sekali saat halaman dibuka'

  // 2. Fungsi untuk menangani perubahan di setiap input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Fungsi untuk menyimpan (submit) form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      // Panggil API untuk update
      await industryService.updateMyProfile(formData);
      setMessage('Profil perusahaan berhasil diperbarui!');
    } catch (error) {
      console.error('Gagal menyimpan profil', error);
      setMessage('Gagal menyimpan profil. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // Tampilkan 'Loading...' saat data sedang diambil
  if (loading) {
    return <div className="p-8 text-center">Loading data profil...</div>;
  }

  // 4. Tampilan (JSX) dari formulir
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Profil Perusahaan</h1>

      {message && (
        <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 max-w-lg">
        {/* Nama Perusahaan */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_perusahaan">Nama Perusahaan</label>
          <input type="text" name="nama_perusahaan" value={formData.nama_perusahaan} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3" />
        </div>
        {/* Sektor Industri */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sektor_industri">Sektor Industri</label>
          <input type="text" name="sektor_industri" value={formData.sektor_industri} onChange={handleChange} required placeholder="Contoh: Manufaktur, Horeca, Ritel" className="shadow border rounded w-full py-2 px-3" />
        </div>

        {/* Tombol Submit */}
        <div className="mt-6">
          <button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndustryProfilePage;