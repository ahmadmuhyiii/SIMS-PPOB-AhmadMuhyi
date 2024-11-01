import React from 'react';
import logoImage from '../../assets/images/Logo.png';

const TransactionSuccessModal = ({ serviceName, amount, invoiceNumber, onBack }) => {
    return (
        <div className="modal">
            <div className="modal-content flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
                <img src={logoImage} alt="Success Logo" className="w-16 h-16 rounded-full mb-4" />
                <p className="text-center text-gray-600 mb-1">{`Pembayaran ${serviceName} prabayar sebesar`}</p>
                <p className="text-2xl font-bold text-center mb-2">Rp {amount.toLocaleString()}</p>
                <p className="text-center text-gray-600 mb-4">Berhasil!</p>
                {/* <p className="text-sm text-gray-500 mb-6">Invoice: {invoiceNumber}</p> */}
                <button 
                    className="btn text-red-600 font-semibold py-2 px-4 rounded-lg" 
                    onClick={onBack}
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};

export default TransactionSuccessModal;
