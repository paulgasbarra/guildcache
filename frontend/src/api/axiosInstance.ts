import axios from 'axios';

const TOKEN = localStorage.getItem('access_token');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
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
