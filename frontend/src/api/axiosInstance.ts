import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "none";

if (API_URL === undefined) {
    throw new Error('API_URL is not defined');
}

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    config => {
        const TOKEN = localStorage.getItem('access_token');
        if (TOKEN) {
            config.headers['Authorization'] = `Token ${TOKEN}`;
        }
        return config;
    },
    error => Promise.reject(error)
);


export default axiosInstance;
