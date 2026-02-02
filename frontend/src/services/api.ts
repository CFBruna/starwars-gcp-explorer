import axios from 'axios';

declare global {
    interface Window {
        __ENV__?: {
            API_KEY?: string;
            BASE_URL?: string;
        };
    }
}

const config = window.__ENV__ || {};
const API_KEY = config.API_KEY || import.meta.env.VITE_API_KEY || 'dev-api-key-placeholder';
const BASE_URL = config.BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
    },
});

export default apiClient;
