import axios from 'axios';

const checkStatus = (status) => status >= 200 && status < 300;
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const BASE_URL = 'https://team-bolt.herokuapp.com';
const client = axios.create({
  // DEV
  // baseURL:        'https://success-gateway.geniusplazadev.com',
  // STAGING
  baseURL: BASE_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  validateStatus: checkStatus,
});


client.interceptors.request.use(config => {
    // Do something before request is sent
    if(!config.headers.Authorization) {
      config.headers.Authorization = `${localStorage.getItem('token')}`;
    }
    return config;
  },  (error) => {
    return Promise.reject(error);
  });



export { client };