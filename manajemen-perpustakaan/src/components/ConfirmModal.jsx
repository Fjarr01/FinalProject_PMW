import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, bookTitle }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal confirm-modal">
        <h3>Konfirmasi Hapus</h3>
        <p>Apakah kamu yakin ingin menghapus buku <strong>"{bookTitle}"</strong>?</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Batal</button>
          <button className="btn-danger" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  );
}