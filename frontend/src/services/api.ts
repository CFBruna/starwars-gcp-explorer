import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY || 'dev-api-key-change-in-production';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
    },
});

export default apiClient;
