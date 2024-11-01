// import React from 'react';

// const promoData = [
//     { image: require("../assets/images/Banner 1.png") },
//     { image: require("../assets/images/Banner 2.png") },
//     { image: require("../assets/images/Banner 3.png") },
//     { image: require("../assets/images/Banner 4.png") },
//     { image: require("../assets/images/Banner 5.png") },
// ];

// const Banner = () => {
//     return (
//         <div className="p-4 overflow-x-auto hide-scrollbar">
//             <div className="flex gap-4">
//                 {promoData.map((promo, index) => (
//                     <div
//                         key={index}
//                         className="text-white p-2 rounded-lg bg-cover bg-center bg-no-repeat min-w-[250px]">
//                         <img src={promo.image} alt={`Promo ${index + 1}`} className="w-full rounded-lg" />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Banner;

import React, { useEffect, useState } from 'react';
import api from '../services/axios';

const Banner = () => {
    const [promoData, setPromoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await api.get('/banner', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                // console.log('API Response:', response.data); // Log untuk debugging
                setPromoData(response.data.data); // Memperbaiki akses ke data
            } catch (error) {
                console.error('Error fetching banners:', error);
                setError('Failed to fetch banners');
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return (
        <div className="p-4 overflow-x-auto hide-scrollbar">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex gap-4">
                    {promoData.map((promo, index) => (
                        <div
                            key={index}
                            className="text-white p-2 rounded-lg bg-cover bg-center bg-no-repeat min-w-[250px]"
                        >
                            <img src={promo.banner_image} alt={`Promo ${promo.banner_name}`} className="w-full rounded-lg" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;

