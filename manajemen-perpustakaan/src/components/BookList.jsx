import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <div className="empty-state">Tidak ada buku yang ditemukan</div>;
  }

  return (
    <div className="table-container">
      <table className="book-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Tahun</th>
            <th>Genre</th>
            <th>Halaman</th>
            <th>Status</th>
            <th>Kelola</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>
                <strong>{book.judul}</strong>
                <p className="sinopsis-preview">{book.sinopsis}</p>
              </td>
              <td>{book.penulis}</td>
              <td>{book.tahun}</td>
              <td><span className="badge badge-genre">{book.genre}</span></td>
              <td>{book.halaman} hal</td>
              <td>
                <span className={`badge badge-status ${book.status === 'Tersedia' ? 'available' : 'borrowed'}`}>
                  {book.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                    <button className="btn-edit" onClick={() => onEdit(book)} title="Edit">
                        <FiEdit size={18} />
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(book)} title="Hapus">
                        <FiTrash2 size={18} />
                    </button>
                    </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}