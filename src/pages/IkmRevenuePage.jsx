import React, { useState } from 'react';
import ikmService from '../services/ikmService'; // Impor "telepon" IKM

const IkmRevenuePage = () => {
  // --- UBAH STATE FORM ---
  // Hapus state bulan dan tahun
  const [tanggalLapor, setTanggalLapor] = useState(new Date().toISOString().split('T')[0]); // Default hari ini
  const [jumlah, setJumlah] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fungsi untuk menambah pendapatan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    // --- DATA YANG DIKIRIM HARUS BERUBAH ---
    // Backend HARUS disesuaikan untuk menerima ini
    const data = {
      tanggal_lapor: tanggalLapor, // Backend mungkin perlu proses ini jadi 'minggu_ke'
      // bulan: parseInt(bulan), // Hapus
      // tahun: parseInt(tahun), // Hapus
      jumlah_pendapatan: parseInt(jumlah)
    };

    try {
      // Panggil API
      // CATATAN: Backend perlu diubah untuk menerima format data baru
      await ikmService.addRevenue(data);
      setMessage('Laporan pendapatan berhasil ditambahkan!');

      // Kosongkan form
      setJumlah('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menambah laporan. (Backend mungkin belum siap)');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      {/* --- UBAH JUDUL --- */}
      <h1 className="text-3xl font-bold mb-6">Lapor Pendapatan Mingguan</h1>

      {/* === FORMULIR TAMBAH PENDAPATAN === */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Tambah Laporan Baru</h2>
        {message && (
          <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </p>
        )}

        {/* --- UBAH INPUT BULAN/TAHUN MENJADI TANGGAL --- */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_lapor">
            Tanggal (Mewakili akhir minggu)
          </label>
          <input 
            type="date" 
            name="tanggal_lapor" 
            value={tanggalLapor} 
            onChange={(e) => setTanggalLapor(e.target.value)} 
            required 
            className="shadow border rounded w-full py-2 px-3" 
          />
        </div>
        
        {/* Jumlah Pendapatan */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jumlah_pendapatan">Jumlah Pendapatan (Rp)</label>
          <input type="number" name="jumlah_pendapatan" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required placeholder="Contoh: 5000000" className="shadow border rounded w-full py-2 px-3" />
        </div>

        {/* Tombol Submit */}
        <button type="submit" disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
          {saving ? 'Menyimpan...' : 'Simpan Laporan'}
        </button>
      </form>

      {/* --- TAMBAHAN TABEL RIWAYAT --- */}
      <div className="mt-12 bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-4">Riwayat Laporan Mingguan</h2>
        <p className="text-gray-500">
          (Fitur tabel ini membutuhkan API dari backend untuk mengambil riwayat laporan pendapatan mingguan Anda.)
        </p>
        {/* Di sini Anda perlu fetch data riwayat (API baru) dan map ke <table>
          Contoh:
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead> ... </thead>
            <tbody> ... </tbody>
          </table>
        */}
      </div>
    </div>
  );
};

export default IkmRevenuePage;