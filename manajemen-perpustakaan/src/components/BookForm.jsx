import React, { useState, useEffect } from "react";
import "../styles/modal.css";

const genreOptions = ["Fiksi", "Non-Fiksi", "Sejarah", "Sains", "Teknologi", "Biografi", "Lainnya"];

function BookForm({ isOpen, onClose, onSave, editData }) {
  const [form, setForm] = useState({
    judul: "", penulis: "", tahun: new Date().getFullYear(),
    genre: "Fiksi", halaman: "", deskripsi: "",
  });

  useEffect(() => {
    if (editData) {
      const { status, ...rest } = editData;
      setForm({ ...rest });
    } else {
      setForm({ judul: "", penulis: "", tahun: new Date().getFullYear(), genre: "Fiksi", halaman: "", deskripsi: "" });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.judul.trim() || !form.penulis.trim()) { alert("Judul dan penulis wajib diisi!"); return; }
    onSave({ ...form, tahun: Number(form.tahun), halaman: Number(form.halaman) });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{editData ? "Edit Buku" : "Tambah Buku"}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">Judul Buku *</label>
          <input className="form-input" name="judul" value={form.judul} onChange={handleChange} placeholder="Masukkan judul buku" />
        </div>
        <div className="form-group">
          <label className="form-label">Nama Penulis *</label>
          <input className="form-input" name="penulis" value={form.penulis} onChange={handleChange} placeholder="Masukkan nama penulis" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Tahun Terbit</label>
            <input className="form-input" name="tahun" type="number" value={form.tahun} onChange={handleChange} min="1900" max="2099" />
          </div>
          <div className="form-group">
            <label className="form-label">Jumlah Halaman</label>
            <input className="form-input" name="halaman" type="number" value={form.halaman} onChange={handleChange} placeholder="cth: 350" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Genre</label>
            <select className="form-select" name="genre" value={form.genre} onChange={handleChange}>
              {genreOptions.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          {/* FIELD STATUS DIHAPUS — status buku sekarang otomatis dari data peminjaman */}
        </div>
        <div className="form-group">
          <label className="form-label">Deskripsi</label>
          <textarea className="form-textarea" name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Deskripsi singkat buku..." />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Batal</button>
          <button className="btn-save" onClick={handleSubmit}>{editData ? "Simpan Perubahan" : "Tambah Buku"}</button>
        </div>
      </div>
    </div>
  );
}

export default BookForm;