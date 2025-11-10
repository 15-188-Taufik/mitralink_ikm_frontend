import React, { useState, useEffect } from 'react';
import ikmService from '../services/ikmService'; // Impor "telepon" IKM

const IkmProfilePage = () => {
  // State untuk form DATA TEKS
  const [formData, setFormData] = useState({
    nama_usaha: '',
    nama_pemilik: '',
    alamat: '',
    no_hp: '',
    link_ecommerce: '',
    foto_url: '',
    deskripsi: '',
  });
  
  // State untuk form UNGGAH FOTO
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // State Bantuan
  const [loading, setLoading] = useState(true); // Dimulai sebagai true
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(''); // Pesan sukses/error untuk form teks
  const [picMessage, setPicMessage] = useState(''); // Pesan sukses/error untuk foto

  // 1. Fungsi untuk mengambil data profil
  const fetchProfile = async () => {
    try {
      console.log('Memulai fetchProfile...'); // Log Debug
      const response = await ikmService.getMyProfile();
      console.log('Sukses mengambil profil:', response.data); // Log Debug

      setFormData({
        nama_usaha: response.data.nama_usaha || '',
        nama_pemilik: response.data.nama_pemilik || '',
        alamat: response.data.alamat || '',
        no_hp: response.data.no_hp || '',
        link_ecommerce: response.data.link_ecommerce || '',
        foto_url: response.data.foto_url || '',
        deskripsi: response.data.deskripsi || '',
      });
    } catch (error) {
      console.error('Error Gagal mengambil profil:', error.response?.data || error.message); // Log Debug
      if (error.response?.status === 404) {
        setMessage('Anda belum melengkapi profil. Silakan isi data di bawah ini dan simpan.');
      } else {
        setMessage('Gagal mengambil data profil.');
      }
    } finally {
      // INI ADALAH PERBAIKAN BUG "LOADING..."
      console.log('Menjalankan blok "finally", setLoading menjadi false.'); // Log Debug
      setLoading(false); 
    }
  };

  // 2. Ambil data profil saat halaman pertama kali dibuka
  useEffect(() => {
    fetchProfile();
  }, []); // Dependency array [ ] sudah benar (hanya jalan 1x)

  // 3. Handler untuk form DATA TEKS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmitText = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await ikmService.updateMyProfile(formData);
      setMessage('Profil teks berhasil diperbarui!');
    } catch (error) {
      setMessage('Gagal menyimpan profil teks. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  // 4. Handler untuk form UNGGAH FOTO
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    if (!file) {
      setPicMessage('Silakan pilih file gambar terlebih dahulu.');
      return;
    }
    setUploading(true);
    setPicMessage('');

    const formData = new FormData();
    formData.append('foto_profil', file); // Kunci harus 'foto_profil'

    try {
      await ikmService.updateMyProfilePicture(formData);
      setPicMessage('Foto profil berhasil diunggah!');
      fetchProfile(); // Ambil ulang data profil (agar gambar baru muncul)
      setFile(null); 
      if(document.getElementById('foto_profil')) {
         document.getElementById('foto_profil').value = null; // Reset input file
      }
    } catch (error) {
      setPicMessage(error.response?.data?.message || 'Gagal mengunggah foto.');
    } finally {
      setUploading(false);
    }
  };

  // Tampilkan 'Loading...' jika state loading true
  if (loading) {
    return <div className="p-8 text-center">Loading data profil...</div>;
  }

  // 5. Tampilan (JSX)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Profil Usaha Anda</h1>
      
      {/* === BAGIAN 1: UBAH FOTO PROFIL === */}
      <div className="bg-white shadow-md rounded p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Foto Profil Publik</h2>
        <p className="text-sm text-gray-600 mb-4">Foto ini akan tampil di halaman direktori publik.</p>
        
        {/* Tampilkan foto saat ini */}
        <img 
          src={formData.foto_url || 'https://via.placeholder.com/300x300.png?text=Foto+Profil'}
          alt="Foto Profil"
          className="w-48 h-48 object-cover rounded-lg mb-4 border"
        />

        {picMessage && (
          <p className={`p-3 rounded mb-4 ${picMessage.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {picMessage}
          </p>
        )}

        <form onSubmit={handleSubmitPicture}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto_profil">Pilih Foto Baru</label>
            <input 
              type="file" 
              name="foto_profil" 
              id="foto_profil"
              onChange={handleFileChange} 
              className="shadow border rounded w-full py-2 px-3"
              accept="image/png, image/jpeg, image/gif"
            />
          </div>
          <button type="submit" disabled={uploading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
            {uploading ? 'Mengunggah...' : 'Unggah Foto'}
          </button>
        </form>
      </div>

      {/* === BAGIAN 2: UBAH DATA TEKS === */}
      <form onSubmit={handleSubmitText} className="bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-4">Data Teks Profil</h2>
        {message && (
          <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </p>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_usaha">Nama Usaha</label>
          <input type="text" name="nama_usaha" value={formData.nama_usaha} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_pemilik">Nama Pemilik</label>
          <input type="text" name="nama_pemilik" value={formData.nama_pemilik} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">Alamat</label>
          <textarea name="alamat" value={formData.alamat} onChange={handleChange} className="shadow border rounded w-full py-2 px-3"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no_hp">No. HP (WhatsApp)</label>
          <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">Deskripsi Singkat Usaha</label>
          <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} className="shadow border rounded w-full py-2 px-3"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link_ecommerce">Link E-commerce (Tokopedia/Shopee)</label>
          <input type="text" name="link_ecommerce" value={formData.link_ecommerce} onChange={handleChange} className="shadow border rounded w-full py-2 px-3" />
        </div>

        <div className="mt-6">
          <button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
            {saving ? 'Menyimpan...' : 'Simpan Perubahan Teks'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IkmProfilePage;