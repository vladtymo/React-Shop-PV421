import { message } from "antd";
import axios from "axios";

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
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
        const response = await fetch(`https://fakestoreapi.com/products/categories`);
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
        const res = await axios.post(`https://fakestoreapi.com/products`, model);
        return res.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        return null;
    }
}

export { deleteProduct, loadCategories, createProduct }

