import React, { useState, useEffect } from 'react';

export default function BookForm({ isOpen, onClose, onSave, editBook }) {
  const initialForm = {
    judul: '',
    penulis: '',
    tahun: '',
    genre: 'Fiksi',
    status: 'Tersedia',
    halaman: '',
    sinopsis: ''
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editBook) {
      setForm(editBook);
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editBook, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.judul.trim()) newErrors.judul = 'Judul wajib diisi';
    if (!form.penulis.trim()) newErrors.penulis = 'Penulis wajib diisi';
    if (!form.tahun || form.tahun < 1000 || form.tahun > 2100) newErrors.tahun = 'Tahun tidak valid';
    if (!form.halaman || form.halaman < 1) newErrors.halaman = 'Jumlah halaman tidak valid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, id: editBook ? editBook.id : Date.now() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul Buku</label>
            <input name="judul" value={form.judul} onChange={handleChange} />
            {errors.judul && <span className="error">{errors.judul}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Penulis</label>
              <input name="penulis" value={form.penulis} onChange={handleChange} />
              {errors.penulis && <span className="error">{errors.penulis}</span>}
            </div>
            <div className="form-group">
              <label>Tahun Terbit</label>
              <input name="tahun" type="number" value={form.tahun} onChange={handleChange} />
              {errors.tahun && <span className="error">{errors.tahun}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genre</label>
              <select name="genre" value={form.genre} onChange={handleChange}>
                <option>Fiksi</option>
                <option>Non-Fiksi</option>
                <option>Sejarah</option>
                <option>Self-Help</option>
                <option>Teknologi</option>
                <option>Sains</option>
                <option>Action</option>
                <option>Drama</option>
                <option>School</option>
                <option>Romance</option>
                <option>Pendidikan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Tersedia</option>
                <option>Dipinjam</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Jumlah Halaman</label>
            <input name="halaman" type="number" value={form.halaman} onChange={handleChange} />
            {errors.halaman && <span className="error">{errors.halaman}</span>}
          </div>

          <div className="form-group">
            <label>Sinopsis</label>
            <textarea name="sinopsis" rows="3" value={form.sinopsis} onChange={handleChange}></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-primary">{editBook ? 'Simpan Perubahan' : 'Tambah Buku'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}