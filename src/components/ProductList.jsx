import React, { useEffect } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import { deleteProduct } from '../services/product.service';
import { useMessage } from '../hooks/useMessage';
import { Link } from 'react-router-dom';

const getColumns = (onDelete) => [
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
    {
        title: 'Actions',
        // dataIndex: 'rating',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/edit/${record.id}`}>
                    <Button type="primary">Edit</Button>
                </Link>

                <Popconfirm
                    title="Delete the product"
                    description={`Are you sure to delete ${record.title}?`}
                    onConfirm={() => onDelete(record.id)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </Space>
        ),
    },
];

const api = "https://fakestoreapi.com/products";

const ProductList = () => {

    const [products, setProducts] = React.useState([]);
    // const [messageApi, contextHolder] = message.useMessage();
    const { contextHolder, showSuccess, showError } = useMessage();

    useEffect(() => {
        fetchProducts();
    }, []);

    const onProductDelete = async (id) => {
        const res = await deleteProduct(id);
        if (res) {
            setProducts(products.filter(product => product.id !== id));

            // messageApi.open({
            //     type: 'success',
            //     content: 'Product deleted successfully!',
            // });
            showSuccess('Product deleted successfully!');
        }
        else
            showError('Failed to delete product!');
    };

    async function fetchProducts() {
        const res = await fetch(api);
        const data = await res.json();
        setProducts(data);
    }

    return (
        <>
            {contextHolder}
            <h2>Product List</h2>

            <Link to="/create">
                <Button type="primary" style={{ marginBottom: '12px' }}>Create New Product</Button>
            </Link>
            <Table columns={getColumns(onProductDelete)} dataSource={products} rowKey={i => i.id} />
        </>
    )
};
export default ProductList;