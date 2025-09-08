import axios from "axios";

export const BASE_URL = 'http://localhost:8080';

export const sellersList = () => {return axios.get(`${BASE_URL}/sellers`)}; // Example function to fetch sellers list

export const createSeller = (seller: {name?: string; email?: string; level?: string}) => {
    return axios.post(`${BASE_URL}/sellers`, seller);
}