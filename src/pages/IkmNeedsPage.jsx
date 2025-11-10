import React, { useState, useEffect } from 'react';
import ikmService from '../services/ikmService'; // Impor "telepon" IKM

const IkmNeedsPage = () => {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(''); 

  // State BARU untuk Modal "Apply"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fungsi untuk mengambil data kebutuhan
  const fetchNeeds = async () => {
    setLoading(true);
    try {
      const response = await ikmService.getAllOpenNeeds();
      setNeeds(response.data);
    } catch (error) {
      console.error('Gagal mengambil kebutuhan', error);
      setMessage('Gagal mengambil daftar kebutuhan.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Ambil data kebutuhan saat halaman dibuka
  useEffect(() => {
    fetchNeeds();
  }, []);

  // === 3. Fungsi-fungsi BARU untuk Modal ===
  const handleOpenModal = (need) => {
    setSelectedNeed(need);
    setIsModalOpen(true);
    setApplicationMessage('');
    setMessage(''); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNeed(null);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      await ikmService.applyToNeed(selectedNeed.need_id, applicationMessage);
      handleCloseModal(); 
      setMessage('Lamaran Anda berhasil terkirim!');
      fetchNeeds(); // Ambil ulang data
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal mengirim lamaran.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const openWhatsApp = (phone) => {
    let formattedPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
    formattedPhone = formattedPhone.replace(/[\s-]/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  // 4. Tampilan (JSX)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Papan Kebutuhan Industri</h1>
      
      {message && !isModalOpen && (
        <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      {/* === DAFTAR KEBUTUHAN === */}
      {loading ? (
        <p>Loading daftar kebutuhan...</p>
      ) : (
        <div className="space-y-6">
          {needs.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Belum ada kebutuhan yang diposting oleh industri.
            </p>
          ) : (
            needs.map(need => (
              <div key={need.need_id} className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{need.nama_perusahaan}</h3>
                    <span className="text-sm font-medium text-gray-500">{need.sektor_industri}</span>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    need.status === 'open' ? 'bg-blue-100 text-blue-800' : 
                    need.status === 'review' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    Status: {need.status}
                  </span>
                </div>
                
                <h2 className="text-2xl font-semibold mt-4 mb-2">{need.judul_kebutuhan}</h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-6">{need.deskripsi}</p>
                
                {/* === Tombol Aksi === */}
                <div className="border-t pt-4 flex gap-4">
                  {need.sudah_melamar ? (
                    <>
                      <button className="bg-green-600 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                        ✓ Sudah Dilamar
                      </button>
                      <button 
                        onClick={() => openWhatsApp(need.no_hp)}
                        className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded hover:bg-green-200"
                        disabled={!need.no_hp}
                      >
                        {need.no_hp ? 'Hubungi via WhatsApp' : 'No. HP tidak tersedia'}
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleOpenModal(need)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Apply Sekarang
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* === MODAL UNTUK APPLY === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Ajukan Lamaran</h2>
            <p className="mb-2">Untuk kebutuhan: <span className="font-semibold">{selectedNeed?.judul_kebutuhan}</span></p>
            <p className="text-sm text-gray-600 mb-4">
              Tulis pesan singkat (cover letter) untuk Industri.
            </p>

            <form onSubmit={handleSubmitApplication}>
              {message && (
                <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {message}
                </p>
              )}
              <textarea
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                placeholder="Contoh: Halo, kami dari IKM Jaya Makmur, siap menyuplai kebutuhan hampers Anda..."
                className="shadow border rounded w-full py-2 px-3 text-gray-700 h-32 mb-4"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Lamaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IkmNeedsPage;