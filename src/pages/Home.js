import React from 'react';
import Navbar from '../components/Navbar';
import ProfileUser from '../components/ProfileUser';
import Saldo from '../components/Saldo';
import Services from '../components/Services';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-14 py-4">
                <div class="grid gap-2 grid-cols-2 mb-10">
                    <ProfileUser />
                    <Saldo />
                </div>
                <Services />
                <h3 className="text-lg font-semibold my-4">Temukan promo menarik</h3>
                <Banner />
            </div>
        </div>
    );
};

export default Home;
