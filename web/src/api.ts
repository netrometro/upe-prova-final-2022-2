import axios from "axios";

export const api = axios.create({
    baseURL: 'https://upeprovafinal.onrender.com/',
});

export default api;