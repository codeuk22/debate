import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://ecomm-api-1vp8.onrender.com/api/";

const Token = localStorage.getItem('token');

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${Token}` }
});