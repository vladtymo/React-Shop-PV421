import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Upload,
} from 'antd';
import { createProduct, loadCategories } from '../services/product.service';
import { useMessage } from '../hooks/useMessage';
const { TextArea } = Input;

const normFile = (e) => {
    return e?.file.originFileObj;
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const ProductForm = () => {
    const [categories, setCategories] = useState([]);
    const { contextHolder, showSuccess, showError } = useMessage();

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const data = await loadCategories();
        setCategories(data || []);
    }

    const onSubmit = async (item) => {
        const res = await createProduct(item);

        if (!res)
            showError('Failed to create product!');
        else
            showSuccess('Product created successfully!');
    }

    return (
        <>
            {contextHolder}
            <h2>Create New Product</h2>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
            >
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select
                        options={categories.map(cat => ({ label: cat.id || cat, value: cat }))}
                    />
                </Form.Item>

                <Form.Item label="Price" name="price" initialValue={100}>
                    <InputNumber addonAfter="$" />
                </Form.Item>

                {/* <Form.Item label="Upload" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload multiple={false} action="/upload.do" listType="picture-card">
                        <button
                            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item> */}
                <Form.Item
                    name="image"
                    label="Image URL"
                >
                    <Input placeholder="Enter product image URL" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="button">
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form >
        </>
    );
};
export default () => <ProductForm />;
