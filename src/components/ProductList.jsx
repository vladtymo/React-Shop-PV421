import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) => <img src={text} alt={record.title} style={{ width: 50, height: 50 }} />,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: text => <span>{text}$</span>,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        render: text => <span>{text.rate}</span>,
    },
];

const api = "https://fakestoreapi.com/products";

const ProductList = () => {

    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const res = await fetch(api);
        const data = await res.json();
        setProducts(data);
    }

    return (
        <>
            <h2>Product List</h2>
            <Table columns={columns} dataSource={products} />
        </>
    )
};
export default ProductList;