import axios from "axios";

const api = axios.create({
    //baseURL: 'http://localhost:5000/api/v1',
    baseURL: 'https://bookstore.mgi.pe/api',
    //withCredentials: true
})

export default api