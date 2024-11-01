import React, { useState, useEffect } from 'react';
import ProfilePhoto from '../assets/images/Profile Photo.png';
import { CiAt } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import api from '../services/axios';

const EditAkun = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data.data);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle saving updated profile data
  const handleSave = async () => {
    try {
      const updatedProfile = {
        first_name: profile.first_name,
        last_name: profile.last_name,
      };

      await api.put('/profile/update', updatedProfile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Profile updated successfully');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col bg-white rounded-lg w-full mx-auto px-24 py-6">
      {/* Profile Picture and Information */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={ProfilePhoto || profile.profile_image }
          alt="Profile"
          className="w-24 h-24 rounded-full border border-gray-300"
        />
        <div className="ml-4">
          <p className="text-lg font-medium text-gray-800">{`${profile.first_name} ${profile.last_name}`}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative w-full mb-4">
            <CiAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="email"
              className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              value={profile.email}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
          <div className="relative w-full mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              value={profile.first_name}
              onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
          <div className="relative w-full mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              value={profile.last_name}
              onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="btn btn-primary bg-red-600 text-white py-2 rounded-sm w-full" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditAkun;
