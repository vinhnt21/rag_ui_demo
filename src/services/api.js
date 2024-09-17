// config axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://chatbot-api.test.ipcoms.com.vn/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export {api};