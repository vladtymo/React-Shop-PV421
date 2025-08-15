import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setEmail } from '../redux/account/account.actions';
// import { AccountContext } from '../contexts/account.context';

const LoginForm = () => {

    const dispatch = useDispatch();
    // const { setEmail } = useContext(AccountContext);

    const onFinish = values => {
        console.log('Success:', values);
        // setEmail(values.username)
        dispatch(setEmail(values.username));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Login</h2>
            <Form
                name="basic"
                style={{ maxWidth: '600px', margin: 'auto', }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default LoginForm;