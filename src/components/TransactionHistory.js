// import React from 'react';

// const transactions = [
//     { id: 1, amount: '+ Rp.10.000', date: '17 Agustus 2023', time: '19:09 WIB', type: 'Top Up Saldo' },
//     { id: 2, amount: '- Rp.40.000', date: '17 Agustus 2023', time: '12:10 WIB', type: 'Pulsa Prabayar' },
//     { id: 3, amount: '- Rp.10.000', date: '17 Agustus 2023', time: '09:00 WIB', type: 'Listrik Prabayar' },
//     { id: 4, amount: '+ Rp.50.000', date: '17 Agustus 2023', time: '19:09 WIB', type: 'Top Up Saldo' },
//     { id: 5, amount: '+ Rp.50.000', date: '17 Agustus 2023', time: '19:09 WIB', type: 'Top Up Saldo' },
// ];

// const TransactionHistory = () => {
//     return (
//         <div className="p-4 w-full mx-auto">
//             <h3 className="text-lg font-semibold mb-4">Semua Transaksi</h3>
//             <div className="space-y-4">
//                 {transactions.map((transaction) => (
//                     <div
//                         key={transaction.id}
//                         className="flex items-center justify-between border-b pb-2"
//                     >
//                         <div>
//                             <p
//                                 className={`text-lg font-semibold ${
//                                     transaction.amount.startsWith('+')
//                                         ? 'text-green-500'
//                                         : 'text-red-500'
//                                 }`}
//                             >
//                                 {transaction.amount}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                                 {transaction.date} • {transaction.time}
//                             </p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-700">{transaction.type}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Show More Button */}
//             <div className="text-center mt-4">
//                 <button className="text-red-500 font-semibold">Show more</button>
//             </div>
//         </div>
//     );
// };

import React, { useEffect, useState } from 'react';
import api from '../services/axios';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true); // To track if more transactions are available
    const limit = 3;

    // Function to fetch transaction history
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token'); // Assume token is stored in localStorage
            const response = await api.get(`/transaction/history`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    offset,
                    limit
                }
            });

            if (response.data.status === 0) {
                const newTransactions = response.data.data.records;
                
                // Append new records to existing transactions
                setTransactions((prev) => [...prev, ...newTransactions]);

                // Check if there are more transactions to load
                if (newTransactions.length < limit) {
                    setHasMore(false); // No more transactions to load
                }
            } else {
                console.error('Error fetching transaction history:', response.data.message);
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };

    // Load initial transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []); // Trigger fetchTransactions whenever offset changes

    // Handle "Show more" button click
    const handleShowMore = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    return (
        <div className="p-4 w-full mx-auto">
            <h3 className="text-lg font-semibold mb-4">Semua Transaksi</h3>
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.invoice_number}
                        className="flex items-center justify-between border-b pb-2"
                    >
                        <div>
                            <p
                                className={`text-lg font-semibold ${
                                    transaction.transaction_type === 'TOPUP'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {transaction.transaction_type === 'TOPUP'
                                    ? `+ Rp.${transaction.total_amount.toLocaleString()}`
                                    : `- Rp.${transaction.total_amount.toLocaleString()}`}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(transaction.created_on).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })} • {new Date(transaction.created_on).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })} WIB
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-700">{transaction.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {hasMore && (
                <div className="text-center mt-4">
                    <button onClick={handleShowMore} className="text-red-500 font-semibold">Show more</button>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;

