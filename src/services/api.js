// config axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'chatbot-api.test.ipcoms.com.vn/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export {api};