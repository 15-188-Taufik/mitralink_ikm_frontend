import React, { useState } from 'react';
import ikmService from '../services/ikmService'; // Impor "telepon" IKM

const IkmRevenuePage = () => {
  // State untuk formulir
  const [bulan, setBulan] = useState(new Date().getMonth() + 1); // Default bulan ini
  const [tahun, setTahun] = useState(new Date().getFullYear()); // Default tahun ini
  const [jumlah, setJumlah] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fungsi untuk menambah pendapatan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const data = {
      bulan: parseInt(bulan),
      tahun: parseInt(tahun),
      jumlah_pendapatan: parseInt(jumlah)
    };

    try {
      // Panggil API
      await ikmService.addRevenue(data);
      setMessage('Laporan pendapatan berhasil ditambahkan!');

      // Kosongkan form
      setJumlah('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menambah laporan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lapor Pendapatan Bulanan</h1>

      {/* === FORMULIR TAMBAH PENDAPATAN === */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Tambah Laporan Baru</h2>
        {message && (
          <p className={`p-3 rounded mb-4 ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </p>
        )}

        {/* Bulan */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bulan">Bulan</label>
          <input type="number" name="bulan" value={bulan} onChange={(e) => setBulan(e.target.value)} required min="1" max="12" className="shadow border rounded w-full py-2 px-3" />
        </div>
        {/* Tahun */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tahun">Tahun</label>
          <input type="number" name="tahun" value={tahun} onChange={(e) => setTahun(e.target.value)} required min="2020" className="shadow border rounded w-full py-2 px-3" />
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

      {/* (Nanti kita bisa tambahkan daftar riwayat pendapatan di sini) */}
    </div>
  );
};

export default IkmRevenuePage;