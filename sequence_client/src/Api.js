import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000 * 10,
  headers: { 'Content-Type': 'application/json', },
  proxyHeaders: false,
  credentials: false
});

export default Api