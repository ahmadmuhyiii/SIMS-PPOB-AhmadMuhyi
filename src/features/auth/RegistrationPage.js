// src/features/auth/RegistrationPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/authSlice';
import characterImage from '../../assets/images/Illustrasi_Login.png';
import { CiAt, CiLock, } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        dispatch(register({ email, password, first_name: firstName, last_name: lastName }))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/home');
                }
            });
    };

    return (
        <div className="grid h-full grid-cols-1 md:grid-cols-2 items-center justify-center bg-white">
            <div className="flex items-center justify-center bg-white rounded-lg">
                <div className="flex flex-col items-center w-96 ml-20">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">SIMS PPOB Ahmad Muhyi</h2>
                    <p className="text-black font-semibold text-xl text-center">Lengkapi data untuk</p>
                    <p className="text-black font-semibold text-xl mb-6 text-center">membuat akun</p>
                    
                    <form onSubmit={handleRegister}>
                        <div className="relative w-96 mb-4 ">
                            <CiAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="masukkan email anda"
                                className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative w-full mb-4">
                            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="nama depan"
                                className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative w-full mb-4">
                            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="nama belakang"
                                className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative w-full mb-6">
                            <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="buat password"
                                className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative w-full mb-6">
                            <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="konfirmasi password"
                                className="w-full p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-red-600 text-white font-semibold rounded-sm hover:bg-red-700 transition-colors"
                        >
                            {loading ? 'Loading...' : 'Daftar'}
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-500 bg-red-50 rounded-md p-4 w-96 text-start absolute bottom-0">
                            {error}
                        </p>
                    )}
                    <p className="mt-4 text-sm text-gray-500">
                        Sudah punya akun? <a href="/" className="text-red-600">login di sini</a>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-white rounded-lg pl-20">
                <img src={characterImage} alt="Login Illustration" className="w-svw h-screen" />
            </div>
        </div>
    );
};

export default RegistrationPage;
