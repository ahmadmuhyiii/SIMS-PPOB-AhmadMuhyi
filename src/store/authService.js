import axios from 'axios';

// const API_URL = 'https://api-doc-tht.nutech-integrasi.com/login';
const API_URL = 'https://take-home-test-api.nutech-integrasi.com/login';

const login = async (credentials) => {
    return await axios.post(API_URL, credentials);
};

const authService = { login };
export default authService;
