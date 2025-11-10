import React, { useState, useEffect } from 'react';
import ikmService from '../services/ikmService'; // Impor "telepon" IKM

const IkmProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [namaProduk, setNamaProduk] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState(null); 
  
  const [loading, setLoading] = useState(true); // Dimulai sebagai true
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Fungsi untuk mengambil data produk
  const fetchProducts = async () => {
    try {
      const response = await ikmService.getMyProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Gagal mengambil produk', error);
      setMessage('Gagal mengambil daftar produk.');
    } finally {
      // INI ADALAH PERBAIKAN BUG "LOADING..."
      setLoading(false); 
    }
  };

  // 2. Ambil data produk saat halaman dibuka
  useEffect(() => {
    fetchProducts();
  }, []); 

  // 3. Handler untuk file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 4. Handler untuk submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Foto produk wajib diunggah.');
      return;
    }
    setSaving(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('nama_produk', namaProduk);
    formData.append('deskripsi_produk', deskripsi);
    formData.append('foto_produk', file); 

    try {
      await ikmService.addProduct(formData);
      setMessage('Produk baru berhasil ditambahkan!');
      setNamaProduk('');
      setDeskripsi('');
      setFile(null);
      if(document.getElementById('foto_produk')) {
         document.getElementById('foto_produk').value = null; 
      }
      fetchProducts(); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menambah produk.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Kelola Produk</h1>

      {/* === FORMULIR TAMBAH PRODUK === */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Tambah Produk Baru</h2>
        {message && (
          <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </p>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_produk">Nama Produk</label>
          <input type="text" name="nama_produk" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} required className="shadow border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi_produk">Deskripsi</label>
          <textarea name="deskripsi_produk" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="shadow border rounded w-full py-2 px-3"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto_produk">Foto Produk</label>
          <input 
            type="file" 
            name="foto_produk" 
            id="foto_produk"
            onChange={handleFileChange} 
            required
            className="shadow border rounded w-full py-2 px-3"
            accept="image/png, image/jpeg, image/gif"
          />
        </div>
        <button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
          {saving ? 'Mengunggah...' : 'Tambah Produk'}
        </button>
      </form>

      {/* === DAFTAR PRODUK YANG SUDAH ADA === */}
      <h2 className="text-2xl font-bold mb-4">Daftar Produk Anda</h2>
      {loading ? (
        <p>Loading daftar produk...</p>
      ) : (
        <div className="bg-white shadow-md rounded p-8">
          {products.length === 0 ? (
            <p>Anda belum memiliki produk.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.product_id} className="border rounded-lg overflow-hidden shadow-lg">
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
      )}
    </div>
  );
};

export default IkmProductsPage;