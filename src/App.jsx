import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProductList from './components/ProductList'
import NoPage from './components/NoPage'
import ProductForm from './components/ProductForm'
import LoginForm from './components/LoginForm'
import LogoutPage from './components/LogoutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="create" element={<ProductForm />} />
          <Route path="edit/:id" element={<ProductForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
