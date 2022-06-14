import axios from 'axios';
import {TBrand, TCategory, TEmployee, TGetAllCountProducts, TGetOneCountProduct} from '../types';

const REACT_API_BASE_URL = 'http://localhost:5000/api'

export const api = {
  product: {
    getAll: async (page: number, limit: number, sorting?: string) => await axios.get<TGetAllCountProducts>(`${REACT_API_BASE_URL}/product?page=${page}&limit=${limit}&sorting=${sorting}`),
    getOne: async (id: number) => await axios.get<TGetOneCountProduct>(`${REACT_API_BASE_URL}/product/${id}`),
    addOne: async (product: FormData) => await axios.post<unknown>(`${REACT_API_BASE_URL}/product`, product),
    updateOne: async (product: FormData) => await axios.put<unknown>(`${REACT_API_BASE_URL}/product`, product),
    removeOne: async (id_product: number) => await axios.delete<unknown>(`${REACT_API_BASE_URL}/product`, {data: {id_product}})
  },
  brand: {
    getAll: async () => await axios.get<TBrand[]>(`${REACT_API_BASE_URL}/brand`),
    getOne: async (id: number) => await axios.get<TBrand>(`${REACT_API_BASE_URL}/brand/${id}`),
    addOne: async (brand: FormData) => await axios.post<unknown>(`${REACT_API_BASE_URL}/brand`, brand),
    updateOne: async (brand: FormData) => await axios.put<unknown>(`${REACT_API_BASE_URL}/brand`, brand),
    removeOne: async (id_brand: number) => await axios.delete<unknown>(`${REACT_API_BASE_URL}/brand`, {data: {id_brand}}),
  },
  category: {
    getAll: async () => await axios.get<TCategory[]>(`${REACT_API_BASE_URL}/category`),
    getOne: async (id: number) => await axios.get<TCategory>(`${REACT_API_BASE_URL}/category/${id}`),
    addOne: async (category: FormData) => await axios.post<unknown>(`${REACT_API_BASE_URL}/category`, category),
    updateOne: async (category: FormData) => await axios.put<unknown>(`${REACT_API_BASE_URL}/category`, category),
    removeOne: async (id_category: number) => await axios.delete<unknown>(`${REACT_API_BASE_URL}/category`, {data: {id_category}}),
  },
  employee: {
    getAll: async () => await axios.get<TEmployee[]>(`${REACT_API_BASE_URL}/employee`),
  }
}

export type TApi = typeof api