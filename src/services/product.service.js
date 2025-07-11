import { message } from "antd";

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

export { deleteProduct }