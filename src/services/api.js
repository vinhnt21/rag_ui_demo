// config axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://chatbot-api.test.ipcoms.com.vn/',
    // baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export {api};