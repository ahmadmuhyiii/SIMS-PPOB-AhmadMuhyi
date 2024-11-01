import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/axios';
import TransactionConfirmationModal from './modals/TransactionConfirmationModal';
import TransactionSuccessModal from './modals/TransactionSuccessModal';
import TransactionFailureModal from './modals/TransactionFailureModal';

const Transaction = () => {
    const location = useLocation();
    const selectedService = location.state;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [transactionResult, setTransactionResult] = useState(null);

    const handleConfirm = () => setShowConfirmation(true);

    const handlePayment = async () => {
        setShowConfirmation(false);
        try {
            const response = await api.post('/transaction', {
                service_code: selectedService.service_code,
                total_amount: selectedService.service_tariff,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.status === 0) {
                setTransactionResult(response.data.data);
                setShowSuccess(true);
            } else {
                setShowFailure(true);
            }
        } catch (error) {
            setShowFailure(true);
        }
    };

    return (
        <div className="p-4 w-full mx-auto">
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Pembayaran</h3>
                <div className="flex items-center gap-2 mb-4">
                    <img src={selectedService.service_icon} alt="Service Icon" className="w-6 h-6" />
                    <p className="text-base font-semibold">{selectedService.service_name}</p>
                </div>
                <div className="shadow-sm border border-gray-400 bg-white  rounded-sm p-2">
                    <p className="text-lg ml-4 font-semibold text-gray-700">Rp {selectedService.service_tariff.toLocaleString()}</p>
                </div>
                <button 
                    onClick={handleConfirm} 
                    className="bg-red-500 text-white font-semibold py-2 w-full rounded-lg mt-4"
                >
                    Bayar
                </button>
            </section>

            {showConfirmation && (
                <TransactionConfirmationModal 
                    serviceName={selectedService.service_name}
                    amount={selectedService.service_tariff}
                    onConfirm={handlePayment}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}

            {showSuccess && transactionResult && (
                <TransactionSuccessModal 
                    serviceName={transactionResult.service_name}
                    amount={transactionResult.total_amount}
                    invoiceNumber={transactionResult.invoice_number}
                    onBack={() => setShowSuccess(false)}
                />
            )}

            {showFailure && (
                <TransactionFailureModal 
                    errorMessage="Transaksi gagal. Silakan coba lagi."
                    onBack={() => setShowFailure(false)}
                />
            )}
        </div>
    );
};

export default Transaction;
