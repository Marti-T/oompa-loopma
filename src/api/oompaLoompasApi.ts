import axios from 'axios';

const baseURL = process.env.VITE_API_URL || 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas';

const oompaLoompasApi = axios.create({
    baseURL,
});

export default oompaLoompasApi;