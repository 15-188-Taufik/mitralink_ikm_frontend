import React, { useState, useEffect } from 'react';
import industryService from '../services/industryService';
import { Link } from 'react-router-dom'; // <-- Impor Link

const IndustryNeedsPage = () => {
  // State untuk daftar kebutuhan
  const [needs, setNeeds] = useState([]);
  // State untuk form
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newNeed, setNewNeed] = useState({
    judul_kebutuhan: '',
    deskripsi: '',
  });

  // Fungsi untuk mengambil data kebutuhan
  const fetchNeeds = async () => {
    try {
      const response = await industryService.getMyNeeds();
      setNeeds(response.data);
    } catch (error) {
      console.error('Gagal mengambil kebutuhan', error);
      setMessage('Gagal mengambil daftar kebutuhan.');
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchNeeds();
  }, []);

  // Handler untuk form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNeed(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await industryService.createNeed(newNeed);
      setMessage('Kebutuhan baru berhasil diposting!');
      setNewNeed({ judul_kebutuhan: '', deskripsi: '' }); // Kosongkan form
      fetchNeeds(); // Ambil ulang daftar
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mem-posting kebutuhan.');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Kelola Kebutuhan (Tender)</h1>

      {/* === FORMULIR POSTING KEBUTUHAN === */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Posting Kebutuhan Baru</h2>
        {message && (
          <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="judul_kebutuhan">Judul Kebutuhan</label>
          <input type="text" name="judul_kebutuhan" value={newNeed.judul_kebutuhan} onChange={handleChange} required placeholder="Contoh: Butuh 500 Hampers Lebaran" className="shadow border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">Deskripsi Lengkap (Spesifikasi, Kuantitas, Batas Waktu)</label>
          <textarea name="deskripsi" value={newNeed.deskripsi} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3 h-32"></textarea>
        </div>
        <button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
          {saving ? 'Memposting...' : 'Posting Kebutuhan'}
        </button>
      </form>

      {/* === DAFTAR KEBUTUHAN (BISA DI-KLIK) === */}
      <h2 className="text-2xl font-bold mb-4">Daftar Kebutuhan Anda</h2>
      {loading ? (
        <p>Loading daftar kebutuhan...</p>
      ) : (
        <div className="bg-white shadow-md rounded p-8">
          {needs.length === 0 ? (
            <p>Anda belum mem-posting kebutuhan apapun.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {needs.map(need => (
                // Bungkus 'li' dengan 'Link' agar bisa diklik
                <Link 
                  key={need.need_id}
                  to={`/dashboard-industri/kebutuhan/${need.need_id}`}
                  className="block hover:bg-gray-50 p-4 -m-4 rounded-lg"
                >
                  <li className="py-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-blue-700 hover:underline">{need.judul_kebutuhan}</h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        need.status === 'open' ? 'bg-blue-100 text-blue-800' : 
                        need.status === 'review' ? 'bg-yellow-100 text-yellow-800' : // <-- Status baru
                        'bg-gray-100 text-gray-800'
                      }`}>
                        Status: {need.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 truncate">{need.deskripsi}</p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default IndustryNeedsPage;