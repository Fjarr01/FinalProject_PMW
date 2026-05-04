import React, { useState, useEffect } from "react";
import "../styles/modal.css";

function AnggotaForm({ isOpen, onClose, onSave, editData }) {
  const [form, setForm] = useState({ nama: "", email: "", telepon: "", alamat: "", tanggalDaftar: "" });

  useEffect(() => {
    if (editData) setForm({ ...editData });
    else setForm({ nama: "", email: "", telepon: "", alamat: "", tanggalDaftar: new Date().toISOString().slice(0, 10) });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.nama.trim()) { alert("Nama wajib diisi!"); return; }
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{editData ? "Edit Anggota" : "Tambah Anggota"}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="form-group">
          <label className="form-label">Nama Lengkap *</label>
          <input className="form-input" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama lengkap" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="contoh@email.com" />
        </div>
        <div className="form-group">
          <label className="form-label">No. Telepon</label>
          <input className="form-input" name="telepon" value={form.telepon} onChange={handleChange} placeholder="08xxxxxxxxxx" />
        </div>
        <div className="form-group">
          <label className="form-label">Alamat</label>
          <textarea className="form-textarea" name="alamat" value={form.alamat} onChange={handleChange} placeholder="Alamat lengkap anggota" />
        </div>
        <div className="form-group">
          <label className="form-label">Tanggal Daftar</label>
          <input className="form-input" name="tanggalDaftar" type="date" value={form.tanggalDaftar} onChange={handleChange} />
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Batal</button>
          <button className="btn-save" onClick={handleSubmit}>{editData ? "Simpan Perubahan" : "Tambah Anggota"}</button>
        </div>
      </div>
    </div>
  );
}

export default AnggotaForm;