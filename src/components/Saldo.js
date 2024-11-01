import React, { useEffect, useState } from 'react';
import api from '../services/axios';
import bgImage from '../assets/images/Background Saldo.png';

const Saldo = () => {
    const [balance, setBalance] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await api.get('/balance', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBalance(response.data.data.balance); 
            } catch (error) {
                console.error('Error fetching balance:', error);
                setError('Failed to fetch balance');
            } finally {
                setLoading(false); 
            }
        };

        fetchBalance();
    }, []);

    return (
        <div
            className="py-4 px-3 bg-cover bg-no-repeat rounded-lg text-lg w-full"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {loading ? (
                <p className="text-white">Loading...</p> // Tampilkan loading saat mengambil data
            ) : error ? (
                <p className="text-red-500">{error}</p> // Tampilkan pesan error jika ada
            ) : (
                <>
                    <p className="text-white">Saldo anda</p>
                    <p className="text-white text-2xl font-bold">
                        Rp {balance.toLocaleString('id-ID')} 
                    </p>
                    <button className="mt-5 text-sm flex items-center text-white">
                        Lihat Saldo
                    </button>
                </>
            )}
        </div>
    );
};

export default Saldo;
