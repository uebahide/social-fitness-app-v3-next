import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
