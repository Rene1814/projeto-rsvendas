import axios from "axios";
import { Sale } from "types/sale";
import { Seller } from "types/seller";

export const BASE_URL = 'http://localhost:8080';

export const getSale = (id: number) => {
    return axios.get(`${BASE_URL}/sales/${id}`)
}

export const createSale = (sale: Sale) => axios.post(`${BASE_URL}/sales`, sale);

export const updateSale = (id: number, sale: Sale) => axios.put(`${BASE_URL}/sales/${id}`, sale);

export const deleteSale = (id: number | undefined) => {
    return axios.delete(`${BASE_URL}/sales/${id}`);
}

export const sellersList = () => {
    return axios.get(`${BASE_URL}/sellers`)
}; // Example function to fetch sellers list

export const getSeller = (id: number) => axios.get(`${BASE_URL}/sellers/${id}`);


export const createSeller = (seller: Seller) => {
    return axios.post(`${BASE_URL}/sellers`, seller);
}

export const updateSeller = (id: number, seller: Seller) => {
    return axios.put(`${BASE_URL}/sellers/${id}`, seller);
}

export const deleteSeller = (id: number | undefined) => {
    return axios.delete(`${BASE_URL}/sellers/${id}`);
}