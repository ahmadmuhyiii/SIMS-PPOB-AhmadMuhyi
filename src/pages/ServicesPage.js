import React from 'react';
import Navbar from '../components/Navbar';
import ProfileUser from '../components/ProfileUser';
import Saldo from '../components/Saldo';
import TopUp from '../components/TopUp';
import Transaction from '../components/Transaction';
import TransactionHistory from '../components/TransactionHistory';

const ServicesPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-14 py-4">
                <div className="grid gap-2 grid-cols-2 mb-10">
                    <ProfileUser />
                    <Saldo />
                </div>
                <Transaction />
            </div>
        </div>
    );
};

export default ServicesPage;
