import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import industryService from '../services/industryService';

const IndustryNeedDetailPage = () => {
  // Ambil 'id' Kebutuhan dari URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [need, setNeed] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fungsi untuk mengambil data (detail kebutuhan + daftar pelamar)
  const fetchNeedDetails = async () => {
    try {
      const response = await industryService.getNeedApplicants(id);
      setNeed(response.data.need);
      setApplicants(response.data.applicants);
    } catch (error) {
      setMessage('Gagal memuat detail kebutuhan.');
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchNeedDetails();
  }, [id]);

  // Fungsi untuk tombol WhatsApp (kita ambil dari halaman IKM)
  const openWhatsApp = (phone) => {
    let formattedPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
    formattedPhone = formattedPhone.replace(/[\s-]/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  // Fungsi untuk menutup kebutuhan
  const handleCloseNeed = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menutup kebutuhan ini?')) {
      return;
    }
    try {
      await industryService.updateNeedStatus(id, 'closed');
      setMessage('Kebutuhan berhasil ditutup.');
      // Perbarui status di UI
      setNeed(prev => ({ ...prev, status: 'closed' }));
    } catch (error) {
      setMessage('Gagal menutup kebutuhan.');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading detail...</div>;
  if (!need) return <div className="p-8 text-center text-red-600">{message}</div>;

  return (
    <div className="p-8">
      {/* === BAGIAN 1: DETAIL KEBUTUHAN === */}
      <div className="bg-white shadow-md rounded p-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{need.judul_kebutuhan}</h1>
          <span className={`text-lg font-medium px-4 py-2 rounded-full ${
            need.status === 'open' ? 'bg-blue-100 text-blue-800' : 
            need.status === 'review' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-gray-200 text-gray-800'
          }`}>
            Status: {need.status}
          </span>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap mb-6">{need.deskripsi}</p>

        {/* Tombol Aksi untuk Industri */}
        {need.status !== 'closed' && (
          <button 
            onClick={handleCloseNeed}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          >
            Tutup Kebutuhan Ini (Selesai)
          </button>
        )}
      </div>

      {/* === BAGIAN 2: DAFTAR PELAMAR (SESUAI PERMINTAAN ANDA) === */}
      <h2 className="text-2xl font-bold mb-4">Daftar Pelamar ({applicants.length})</h2>
      <div className="space-y-4">
        {applicants.length === 0 ? (
          <p className="text-gray-500">Belum ada IKM yang melamar.</p>
        ) : (
          applicants.map((app) => (
            <div key={app.created_at} className="bg-white shadow-md rounded-lg p-6 flex gap-4">
              {/* Foto IKM Pelamar */}
              <img 
                src={app.foto_url || 'https://via.placeholder.com/100'}
                alt={app.nama_usaha}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              {/* Info Lamaran */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{app.nama_usaha}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Melamar pada: {new Date(app.created_at).toLocaleString('id-ID')}
                </p>
                {/* "Massage" (Pesan) dari IKM */}
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md italic">
                  "{app.message}"
                </p>

                {/* Tombol WhatsApp (Aksi) */}
                <button
                  onClick={() => openWhatsApp(app.no_hp)}
                  className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                  disabled={!app.no_hp}
                >
                  {app.no_hp ? 'Hubungi IKM (WhatsApp)' : 'No. HP tidak tersedia'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IndustryNeedDetailPage;