import React, { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiBookOpen, FiCamera } from "react-icons/fi";
import BookForm from "./BookForm";
import ConfirmModal from "./ConfirmModal";
import QRGenerator from "./QRGenerator";
import "../styles/table.css";

function BookList({ books, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showQR, setShowQR] = useState(null);

  const genres = ["Semua", ...new Set(books.map((b) => b.genre))];

  const filtered = books.filter((b) => {
    const matchSearch = b.judul.toLowerCase().includes(search.toLowerCase()) || b.penulis.toLowerCase().includes(search.toLowerCase());
    const matchGenre = filterGenre === "Semua" || b.genre === filterGenre;
    const matchStatus = filterStatus === "Semua" || b.status === filterStatus;
    return matchSearch && matchGenre && matchStatus;
  });

  const handleEdit = (book) => { setEditData(book); setShowForm(true); };
  const handleCloseForm = () => { setShowForm(false); setEditData(null); };
  const handleSave = (data) => {
    if (editData) onEdit({ ...data, id: editData.id });
    else onAdd({ ...data, id: Date.now() });
    setEditData(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Data Buku</h1>
        <p className="page-subtitle">Kelola seluruh koleksi buku perpustakaan</p>
      </div>

      <div className="section-card">
        <div className="toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><FiSearch /></span>
            <input className="search-input" placeholder="Cari judul atau penulis..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="filter-select" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
            {genres.map((g) => <option key={g}>{g}</option>)}
          </select>
          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {["Semua", "Tersedia", "Dipinjam"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ Tambah Buku</button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>No</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Tahun</th>
                <th>Genre</th>
                <th>Halaman</th>
                <th>Status</th>
                <th style={{ width: "120px" }}>Kelola</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={8}><span className="empty-icon"><FiBookOpen /></span>Tidak ada data buku</td>
                </tr>
              ) : (
                filtered.map((book, idx) => (
                  <tr key={book.id}>
                    <td style={{ color: "#94a3b8" }}>{idx + 1}</td>
                    <td>
                      <span className="td-title">{book.judul}</span>
                      {book.deskripsi && <span className="td-sub">{book.deskripsi}</span>}
                    </td>
                    <td>{book.penulis}</td>
                    <td>{book.tahun}</td>
                    <td><span className="badge-genre">{book.genre}</span></td>
                    <td>{book.halaman ? `${book.halaman} hal` : "-"}</td>
                    <td>
                      <span className={`badge ${book.status === "Tersedia" ? "badge-tersedia" : "badge-dipinjam"}`}>{book.status}</span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-icon" onClick={() => setShowQR(book)} title="Lihat QR">
                          <FiCamera />
                        </button>
                        <button className="btn-icon edit" onClick={() => handleEdit(book)} title="Edit">
                          <FiEdit2 />
                        </button>
                        <button className="btn-icon del" onClick={() => setDeleteId(book.id)} title="Hapus">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {showQR && (
        <div className="modal-backdrop" onClick={() => setShowQR(null)}>
          <div className="modal-box small" onClick={(e) => e.stopPropagation()}>
            <QRGenerator buku={showQR} onClose={() => setShowQR(null)} />
          </div>
        </div>
      )}

      <BookForm isOpen={showForm} onClose={handleCloseForm} onSave={handleSave} editData={editData} />
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { onDelete(deleteId); setDeleteId(null); }} title="Hapus Buku?" message="Buku ini akan dihapus secara permanen." />
    </div>
  );
}

export default BookList;