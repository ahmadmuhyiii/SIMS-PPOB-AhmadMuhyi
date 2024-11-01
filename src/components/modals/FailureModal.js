import React from 'react';

const FailureModal = ({ message, onBack }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p className="text-lg text-red-500">{message}</p>
          <button className="btn btn-primary" onClick={onBack}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  };

export default FailureModal;
