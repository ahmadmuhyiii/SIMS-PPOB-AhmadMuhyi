import React, { useEffect, useState } from 'react';
import ProfilePhoto from '../assets/images/Profile Photo.png'; // Placeholder image
import { CiAt } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import api from '../services/axios'; // Ensure you have this for API calls
import { useNavigate } from 'react-router-dom';

const Akun = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data.data);
      } catch (err) {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/'); // Redirect to login page
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col bg-white rounded-lg w-full mx-auto px-24">
      <div className="flex flex-col items-center mb-4">
        <img
          src={ ProfilePhoto || profile.profile_image } 
          alt="Profile"
          className="w-24 h-24 rounded-full border border-gray-300"
        />
        <div className="ml-4">
          <p className="text-lg font-medium text-gray-800">{`${profile.first_name} ${profile.last_name}`}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative w-full mb-4 ">
            <CiAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="email"
              placeholder="masukkan email anda"
              className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              value={profile.email}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="first_name" className="text-sm font-medium text-gray-700 mb-2">
            Nama Depan
          </label>
          <div className="relative w-full mb-4 ">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              placeholder="masukkan nama depan anda"
              className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              value={profile.first_name}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="last_name" className="text-sm font-medium text-gray-700 mb-2">
            Nama Belakang
          </label>
          <div className="relative w-full mb-4 ">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              placeholder="masukkan nama belakang anda"
              className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              value={profile.last_name}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-4 space-y-2">
      <button
        onClick={() => navigate('/profile/edit')}
        className="btn btn-primary bg-red-600 text-white py-2 rounded-sm w-full mb-4"
      >
        Edit Profil
      </button>
      <button
          onClick={handleLogout}
          className="btn btn-secondary text-red-600 py-2 rounded-sm outline-red-600 outline-none w-full mb-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Akun;
