import React, { useEffect, useState } from 'react';
import api from '../services/axios';
import ProfilePhoto from '../assets/images/Profile Photo.png';

const ProfileUser = () => {
    const [profile, setProfile] = useState({ first_name: '', last_namest_name: '', greeting: 'Selamat datang' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Mengupdate state profile dengan data yang diterima
                setProfile(prevProfile => ({
                    ...prevProfile,
                    first_name: response.data.data.first_name, 
                    last_name: response.data.data.last_name, 
                }));
            } catch (error) {
                console.error('Error fetching profile:', error);
                console.log('Token:', localStorage.getItem('token'));
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="p-4 flex items-center gap-4">
            <div>
                <img src={ProfilePhoto} alt="Profile" className="w-12 h-12 rounded-full" />
                <p className="text-gray-500 mt-2">{profile.greeting},</p>
                <h2 className="text-xl font-bold">{profile.first_name} {profile.last_name}</h2>
            </div>
        </div>
    );
};

export default ProfileUser;
