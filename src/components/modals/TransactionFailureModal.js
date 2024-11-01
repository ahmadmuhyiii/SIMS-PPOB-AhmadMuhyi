import React from 'react';

const TransactionFailureModal = ({ errorMessage, onBack }) => {
    return (
        <div className="modal">
            <div className="modal-content flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Transaksi Gagal</h3>
                <p className="text-center text-gray-600 mb-4">{errorMessage}</p>
                <button 
                    className="btn bg-red-500 text-white font-semibold py-2 px-4 rounded-lg" 
                    onClick={onBack}
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};

export default TransactionFailureModal;
