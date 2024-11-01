import React from 'react';
import logoImage from '../../assets/images/Logo.png';

const ConfirmationModal = ({ message, nominal, onConfirm, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal-content flex flex-col justify-center items-center "> {/* Add text-left class */}
            <img src={logoImage} alt="logomodal" className="w-20 h-20 rounded-full items-center justify-center mb-2" />
          <p>{message}</p>
          <div className="flex flex-col justify-center gap-2">
            <p className='text-2xl font-bold text-center mt-2'>{nominal}</p>
            <button className="text-red-600 font-semibold btn btn-primary mt-4" onClick={onConfirm}>
                Ya, Lanjutkan Top Up
                </button>
                <button className="text-gray-400 btn btn-outline mt-4" onClick={onCancel}>
                Batalkan
                </button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmationModal;
