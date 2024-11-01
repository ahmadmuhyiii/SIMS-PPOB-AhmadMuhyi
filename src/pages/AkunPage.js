import React from 'react';
import Navbar from '../components/Navbar';
import EditAkun from '../components/EditAkun';

const Profile = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-24 py-4">
                <EditAkun />
            </div>
        </div>
    );
};

export default Profile;
