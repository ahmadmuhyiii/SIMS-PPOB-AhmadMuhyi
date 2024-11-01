// src/features/auth/LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import characterImage from '../../assets/images/Illustrasi_Login.png';
import { CiAt, CiLock } from "react-icons/ci";
import { IoMdAlert } from "react-icons/io";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                navigate('/home'); // Redirect to main page if login is successful
            }
        });
    };

    return (
        <div className="grid h-full grid-cols-1 md:grid-cols-2 items-center justify-center bg-white">
            <div className="flex items-center justify-center bg-white rounded-lg">
                {/* Form Container */}
                <div className="flex flex-col items-center w-96 ml-20">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">SIMS PPOB</h2>
                    <p className="text-black font-semibold text-xl text-center">Masuk atau buat akun</p>
                    <p className="text-black font-semibold text-xl mb-6 text-center">untuk memulai</p>

                    <form onSubmit={handleLogin}>
                        <div className="relative w-full mb-4">
                            <CiAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="masukkan email anda"
                                className="w-96 p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative w-full mb-8">
                            <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="masukkan password anda"
                                className="w-96 p-1 pl-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-red-600 text-white font-semibold rounded-sm hover:bg-red-700 transition-colors"
                        >
                            {loading ? 'Loading...' : 'Masuk'}
                        </button>
                    </form>
                    
                    <p className="mt-4 text-sm text-gray-500">
                        Belum punya akun? <a href="/registration" className="text-red-600">registrasi di sini</a>
                    </p>
                    
                    {error && (
                        <p className="text-red-500 bg-red-50 rounded-md p-4 w-96 -mx-20 text-start absolute bottom-0">
                            {error}
                        </p>
                    )}
                     
                </div>
            </div>

            <div className="flex items-center justify-end bg-white rounded-lg pl-20">
                <div className="flex items-end justify-start">
                    <img src={characterImage} alt="Login Illustration" className="w-svw h-screen" />
                </div>
            </div>
        </div>
        
    );
};

export default LoginPage;
