import axios from "axios";
import { Seller } from "types/seller";

export const BASE_URL = 'http://localhost:8080';

export const sellersList = () => {return axios.get(`${BASE_URL}/sellers`)}; // Example function to fetch sellers list

export const findById = (id: number) => {
    return axios.get(`${BASE_URL}/sellers/${id}`);
}

export const createSeller = (seller: {name?: string; email?: string; level?: string}) => {
    return axios.post(`${BASE_URL}/sellers`, seller);
}

export const updateSeller = (id: number, seller: Seller) => {
    return axios.put(`${BASE_URL}/sellers/${id}`, seller);
}