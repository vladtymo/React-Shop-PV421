import { message } from "antd";
import axios from "axios";

const api = import.meta.env.VITE_API_PATH + 'products';

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}

const loadCategories = async () => {
    try {
        const response = await fetch(`${api}/categories`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        return null;
    }
}

const createProduct = async (model) => {
    try {
        const res = await axios.post(api, model);
        return res.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        return null;
    }
}

const editProduct = async (model) => {
    try {
        const res = await axios.put(`${api}/${model.id}`, model);
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

const getProductById = async (id) => {
    try {
        const res = await axios.get(`${api}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error getting product by ID', error);
        return null;
    }
}

export { deleteProduct, loadCategories, createProduct, getProductById, editProduct }

