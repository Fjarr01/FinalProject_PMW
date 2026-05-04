import React from 'react';

export default function SearchFilter({ search, setSearch, filterGenre, setFilterGenre, filterStatus, setFilterStatus }) {
  const genres = ["Semua", "Fiksi", "Non-Fiksi", "Sejarah", "Self-Help", "Teknologi", "Sains", "Action", "Drama", "School", "Romance", "Pendidikan"];
  const statuses = ["Semua", "Tersedia", "Dipinjam"];

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)} className="filter-select">
        {genres.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}