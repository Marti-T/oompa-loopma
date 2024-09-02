import axios from 'axios';


const oompaLoompasApi = axios.create({
    //baseURL: import.meta.env.VITE_API_URL
    baseURL: 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas'
});

export default oompaLoompasApi;