import React from 'react';
import logoImage from '../../assets/images/Logo.png';

const TransactionConfirmationModal = ({ serviceName, amount, onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <div className="modal-content flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
                <img src={logoImage} alt="Transaction Confirmation Logo" className="w-16 h-16 rounded-full mb-4" />
                <p className="text-center text-gray-600">{`Beli ${serviceName} prabayar senilai`}</p>
                <p className="text-2xl font-bold mb-4">Rp {amount.toLocaleString()}</p>
                <div className="flex flex-col gap-4">
                    <button 
                        className="btn text-red-600 font-semibold py-2 px-4 rounded-lg" 
                        onClick={onConfirm}
                    >
                        Ya, Lanjutkan Bayar
                    </button>
                    <button 
                        className="btn text-gray-500 py-2 px-4 rounded-lg" 
                        onClick={onCancel}
                    >
                        Batalkan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionConfirmationModal;
