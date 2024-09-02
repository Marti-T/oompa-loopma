import axios from 'axios';


const oompaLoompasApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default oompaLoompasApi;