// import React, { useEffect, useState } from 'react';
// import api from '../services/axios';
// import { useNavigate } from 'react-router-dom';

// const Services = () => {
//     const [services, setServices] = useState([]); // State untuk menyimpan data layanan
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleClick = (serviceId) => {
//         navigate(`/servicespage`); // Replace with your desired route pattern
//         };

//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//               const response = await api.get('/services', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             }); // Panggil API /services
//                 setServices(response.data.data); // Update state dengan data dari API
//             } catch (error) {
//                 console.error('Error fetching services:', error);
//                 setError('Failed to fetch services');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, []);

    

//     return (
//         <div className="grid grid-cols-12 p-2">
//             {loading ? (
//                 <p className="text-white">Loading...</p>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
//                 services.map((service, index) => (
//                     <div key={index} className="flex flex-col items-center text-center">
//                          <button onClick={handleClick}>
//                             <img src={service.service_icon} alt={service.service_name} className="w-14 h-14 mb-1" />
//                             <p className="text-sm">{service.service_name}</p>
//                         </button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default Services;


import React, { useEffect, useState } from 'react';
import api from '../services/axios';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = (service) => {
        // Pass selected service data via state to the Transaction page
        navigate('/servicespage', { state: service });
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setServices(response.data.data);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError('Failed to fetch services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="grid grid-cols-12 p-2">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                services.map((service, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <button onClick={() => handleClick(service)}  className="flex flex-col items-center justify-center">
                            <img src={service.service_icon} alt={service.service_name} className="w-14 h-14 mb-1" />
                            <p className="text-sm">{service.service_name}</p>
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Services;
