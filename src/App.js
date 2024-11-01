import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginPage from './features/auth/LoginPage';
import RegistrationPage from './features/auth/RegistrationPage';
import TopUpPage from './pages/TopUpPage';
import TransactionPage from './pages/TransactionPage';
import ServicesPage from './pages/ServicesPage';
import AkunPage from './pages/AkunPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path='/home' element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<AkunPage />} />
        <Route path="/topuppage" element={<TopUpPage />} />
        <Route path="/transactionpage" element={<TransactionPage />} />
        <Route path="/servicespage" element={<ServicesPage />} />
      </Routes>
    </div>
  );
}

export default App;