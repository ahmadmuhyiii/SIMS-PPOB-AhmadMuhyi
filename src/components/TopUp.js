import React, { useState } from 'react';
import api from '../services/axios';
import ConfirmationModal from './modals/ConfirmationModal';
import SuccessModal from './modals/SuccessModal';
import FailureModal from './modals/FailureModal';

const TopUp = () => {
    const [topUpAmount, setTopUpAmount] = useState('');
    const [lastTopUpAmount, setLastTopUpAmount] = useState('');
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Ensure only numbers are allowed and not less than 0
        if (!isNaN(value) && Number(value) >= 0) {
            setTopUpAmount(value);
        }
    };

    const initiateTopUp = () => {
        const amount = parseInt(topUpAmount);
        if (amount > 0) {
            setShowConfirmation(true); // Show confirmation modal
        } else {
            setMessage('Amount must be greater than 0.');
        }
    };

    const handleConfirmTopUp = async () => {
        const amount = parseInt(topUpAmount);
        try {
            const response = await api.post(
                '/topup', 
                { top_up_amount: amount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                }
            );
            setBalance(response.data.data.balance); // Update the balance
            setMessage(response.data.message); // Set the success message
            setLastTopUpAmount(topUpAmount); // Store the top-up amount for modal
            setTopUpAmount(''); // Clear the input after successful top-up
            setShowSuccess(true); // Show success modal
        } catch (error) {
            console.error('Error during top-up:', error);
            setMessage('Failed to top up. Please try again.'); // Handle error message
            setShowFailure(true); // Show failure modal
        } finally {
            setShowConfirmation(false); // Hide confirmation modal
        }
    };
    

    return (
        <div>
            <section>
                <h3 className="text-lg">Silahkan masukan</h3>
                <p className="text-2xl font-semibold mb-8">Nominal Top Up</p>
                <div className="grid gap-2 grid-cols-[2.5fr,1.5fr] mb-10">
                    <div className="flex flex-col items-center mb-4">
                        <input
                            type="text"
                            value={topUpAmount}
                            onChange={handleInputChange}
                            placeholder="masukan nominal Top Up"
                            className="border rounded-sm p-2 w-full h-11 mb-2"
                        />
                        <button 
                            onClick={initiateTopUp} // Call initiateTopUp
                            className="bg-gray-300 text-gray-600 font-semibold py-2 mt-2 w-full h-11 rounded-sm"
                        >
                            Top Up
                        </button>
                    </div>
                    {/* Predefined Top-Up Amounts */}
                    <div className="flex flex-wrap gap-2">
                        {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                            <button
                                key={amount}
                                onClick={() => handleInputChange({ target: { value: amount } })}
                                className="bg-white text-gray-700 font-semibold py-2 px-3 w-28 h-11 rounded-sm border border-gray-300 hover:bg-gray-200"
                            >
                                Rp{amount.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>
                {/* {message && <p className="text-red-500">{message}</p>}
                <p className="text-green-500">Current Balance: Rp{balance.toLocaleString()}</p> */}
            </section>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <ConfirmationModal
                    message={`Anda yakin untuk Top Up Sebesar?`}
                    nominal={`Rp${topUpAmount.toLocaleString()}`}
                    onConfirm={handleConfirmTopUp}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}

            {/* Success Modal */}
            {showSuccess && (
                <SuccessModal
                    message="Top Up Sebesar berhasil"
                    nominal={`Rp${lastTopUpAmount.toLocaleString()}`}
                    onBack={() => setShowSuccess(false)}
                />
            )}

            {/* Failure Modal */}
            {showFailure && (
                <FailureModal
                    message="Top Up Balance gagal. Coba lagi."
                    onBack={() => setShowFailure(false)}
                />
            )}
        </div>
    );
}

export default TopUp;

