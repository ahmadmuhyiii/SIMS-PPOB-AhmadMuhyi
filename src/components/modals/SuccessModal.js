import React from 'react';
import logoImage from '../../assets/images/Logo.png';

const SuccessModal = ({ message, nominal,onBack }) => {
    return (
      <div className="modal">
        <div className="modal-content flex flex-col justify-center items-center "> 
            <img src={logoImage} alt="logomodal" className="w-20 h-20 rounded-full items-center justify-center mb-2" />
          <p>{message}</p>
          <div className="flex flex-col justify-center gap-2">
                    <p className='text-2xl font-bold text-center mt-2'>{nominal}</p>
                    <p className='text-center'>berhasil</p>
                <button className="btn btn-primary text-red-500 mt-4" onClick={onBack}>
                    Kembali ke Beranda
                </button>
            </div>
            </div>
      </div>
    );
  };
  

export default SuccessModal;
