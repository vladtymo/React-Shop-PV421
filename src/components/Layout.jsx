import React, { use, useContext, useEffect, useState } from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import {
    DatabaseFilled,
    HeartFilled,
    HomeFilled,
    LoginOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AccountContext } from '../contexts/account.context';
import { FavoriteContext } from '../contexts/favorite.context';

const { Header, Content, Footer } = LayoutAntd;

const anonymousMenuItems = [
    {
        key: '/login',
        label: <Link to="/login">Login</Link>,
        icon: <LoginOutlined />
    },
    {
        key: '/register',
        label: <Link to="/register">Register</Link>,
        icon: <UserOutlined />,
    },
]
const accountMenuItems = [
    {
        key: '/logout',
        label: <Link to="/logout">Logout</Link>,
        icon: <LogoutOutlined />,
    },
]

const Layout = () => {

    const location = useLocation();
    const { email, isAuth } = useContext(AccountContext);
    const { getCount } = useContext(FavoriteContext);


    const appMenuItems = [
        {
            key: '/',
            label: <Link to="/">Home</Link>,
            icon: <HomeFilled />
        },
        {
            key: '/products',
            label: <Link to="/products">Products</Link>,
            icon: <DatabaseFilled />,
        },
        {
            key: '/cart',
            label: <Link to="/cart">Cart</Link>,
            icon: <ShoppingCartOutlined />,
        },
        {
            key: '/favorites',
            label: <Link to="/favorites">Favorites ({getCount()})</Link>,
            icon: <HeartFilled />,
        },
    ]

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <LayoutAntd className='Layout'>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className='logo'>
                    <h2>Shop App</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[['1']]}
                    selectedKeys={[location.pathname]}
                    items={appMenuItems}
                    style={{ flex: 1, minWidth: 0 }}
                />
                {isAuth() && <span style={{ color: "white" }}>Hello, {email}</span>}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[location.pathname]}
                    items={isAuth() ? accountMenuItems : anonymousMenuItems}
                    style={{ flex: 1, justifyContent: "flex-end", minWidth: 0 }}
                />
            </Header>

            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                />
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </LayoutAntd>
    );
};
export default Layout;