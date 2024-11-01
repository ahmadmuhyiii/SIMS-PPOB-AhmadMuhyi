// import React from 'react';
// import logoImage from '../assets/images/Logo.png';

// const Navbar = () => {
//     return (
//         <nav className="flex justify-between items-center px-10 py-4 shadow-sm border-b border-gray-200">
//              <div className="flex items-center gap-2 ml-14">
//                 <img src={logoImage} alt="Profile" className="w-5 h-5 rounded-full" />
//                 <a href='/home' className="text-black text-lg font-semibold">SIMS PPOB</a>
//             </div>
//             <div className="flex gap-16 mr-14 justify-center">
//                 <a href="/topuppage" className="text-black">Top Up</a>
//                 <a href="/transactionpage" className="text-black">Transaction</a>
//                 <a href="#account" className="text-black">Akun</a>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImage from '../assets/images/Logo.png';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-10 py-4 shadow-sm border-b border-gray-200">
             <div className="flex items-center gap-2 ml-14">
                <img src={logoImage} alt="Profile" className="w-5 h-5 rounded-full" />
                <NavLink to="/home" className="text-black text-lg font-semibold">SIMS PPOB</NavLink>
            </div>
            <div className="flex gap-16 mr-14 justify-center">
                <NavLink
                    to="/topuppage"
                    className={({ isActive }) =>
                        isActive ? 'text-red-500' : 'text-black'
                    }
                >
                    Top Up
                </NavLink>
                <NavLink
                    to="/transactionpage"
                    className={({ isActive }) =>
                        isActive ? 'text-red-500' : 'text-black'
                    }
                >
                    Transaction
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? 'text-red-500' : 'text-black'
                    }
                >
                    Akun
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
