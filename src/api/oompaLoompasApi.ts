import axios from 'axios';


const oompaLoompasApi = axios.create({
    baseURL: process.env.VITE_API_URL
});

export default oompaLoompasApi;