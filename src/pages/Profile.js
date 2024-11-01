import React from 'react';
import Navbar from '../components/Navbar';
import Akun from '../components/Akun';

const Profile = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-24 py-4">
                <Akun />
            </div>
        </div>
    );
};

export default Profile;
