import React, { useState, useEffect } from "react";
import "../styles/modal.css";

function PeminjamanForm({ isOpen, onClose, onSave, editData, buku, anggota }) {
  const today = new Date().toISOString().slice(0, 10);
  const plus14 = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);

  const [form, setForm] = useState({ bukuId: "", anggotaId: "", tanggalPinjam: today, tanggalKembali: plus14, status: "Dipinjam" });

  useEffect(() => {
    if (editData) setForm({ ...editData, bukuId: String(editData.bukuId), anggotaId: String(editData.anggotaId) });
    else setForm({ bukuId: String(buku[0]?.id || ""), anggotaId: String(anggota[0]?.id || ""), tanggalPinjam: today, tanggalKembali: plus14, status: "Dipinjam" });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.bukuId || !form.anggotaId) { alert("Pilih buku dan anggota!"); return; }
    onSave({ ...form, bukuId: Number(form.bukuId) });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{editData ? "Edit Peminjaman" : "Tambah Peminjaman"}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="form-group">
          <label className="form-label">Pilih Buku *</label>
          <select className="form-select" name="bukuId" value={form.bukuId} onChange={handleChange}>
            {buku.map((b) => <option key={b.id} value={b.id}>{b.judul}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Pilih Anggota *</label>
          <select className="form-select" name="anggotaId" value={form.anggotaId} onChange={handleChange}>
            {anggota.map((a) => <option key={a.id} value={a.id}>{a.nama} ({a.id})</option>)}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Tanggal Pinjam</label>
            <input className="form-input" name="tanggalPinjam" type="date" value={form.tanggalPinjam} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Tanggal Kembali</label>
            <input className="form-input" name="tanggalKembali" type="date" value={form.tanggalKembali} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={form.status} onChange={handleChange}>
            {["Dipinjam", "Dikembalikan", "Terlambat"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Batal</button>
          <button className="btn-save" onClick={handleSubmit}>{editData ? "Simpan Perubahan" : "Tambah Peminjaman"}</button>
        </div>
      </div>
    </div>
  );
}

export default PeminjamanForm;