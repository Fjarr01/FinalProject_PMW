import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { dummyBooks } from './data/dummyBooks';
import SearchFilter from "./components/SearchFilter.jsx";
import BookList from "./components/BookList.jsx";
import BookForm from "./components/BookForm.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";

import './styles/global.css';
import './styles/layout.css';
import './styles/table.css';
import './styles/modal.css';

export default function App() {
  const [books, setBooks] = useLocalStorage('perpustakaan_books', dummyBooks);
  const [search, setSearch] = useState('');
  const [filterGenre, setFilterGenre] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchSearch = book.judul.toLowerCase().includes(search.toLowerCase()) ||
                          book.penulis.toLowerCase().includes(search.toLowerCase());
      const matchGenre = filterGenre === 'Semua' || book.genre === filterGenre;
      const matchStatus = filterStatus === 'Semua' || book.status === filterStatus;
      return matchSearch && matchGenre && matchStatus;
    });
  }, [books, search, filterGenre, filterStatus]);

  const stats = {
    total: books.length,
    tersedia: books.filter(b => b.status === 'Tersedia').length,
    dipinjam: books.filter(b => b.status === 'Dipinjam').length
  };

  const handleSave = (book) => {
    if (editBook) {
      setBooks(prev => prev.map(b => b.id === book.id ? book : b));
    } else {
      setBooks(prev => [book, ...prev]);
    }
    setEditBook(null);
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      setBooks(prev => prev.filter(b => b.id !== bookToDelete.id));
      setBookToDelete(null);
      setIsConfirmOpen(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditBook(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistem Manajemen Perpustakaan</h1>
        <p>Kelola koleksi buku dengan mudah</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h4>{stats.total}</h4>
          <span>Total Buku</span>
        </div>
        <div className="stat-card available">
          <h4>{stats.tersedia}</h4>
          <span>Tersedia</span>
        </div>
        <div className="stat-card borrowed">
          <h4>{stats.dipinjam}</h4>
          <span>Dipinjam</span>
        </div>
      </div>

      <div className="toolbar">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <button className="btn-add" onClick={() => setIsFormOpen(true)}>
          Tambah Buku
        </button>
      </div>

      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <BookForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSave}
        editBook={editBook}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        bookTitle={bookToDelete?.judul}
      />
    </div>
  );
}