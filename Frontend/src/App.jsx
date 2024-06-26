import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './user/Home';
import Logout from './components/Logout';
import Banner from './components/Banner';
import AdminDashboard from './components/admin/AdminDashboard';
import Fotter from './components/Fotter';
import ProductCard from './components/ProductCard';
import Products from './components/Products';
import ProductProvider from './components/ProductProvider';
import CBProvider from './components/CarousalBannerProvider';
import CarousalFilter from './components/Carousalfilter';
import ProductInformation from './components/ProductInformation';
import Cart from './components/Cart';
import CartProvider from './components/CartProvider'; // Import CartProvider
import ForgotPassword from './components/Forgotpassoword';
import ResetPassword from './components/ResetPassword';

import Order from './components/Order';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className='app'>
      <ToastContainer /> 
      <ProductProvider>
        <CBProvider>
          <CartProvider> {/* Wrap everything with CartProvider */}
            <Router>
              <Navbar />
              <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path = '/forgot' element={<ForgotPassword/>}></Route>
                <Route path='/reset-password/:userId/:token' element={<ResetPassword />} />
                <Route path='/' element={<Home />} />
                <Route path='/banner' element={<Banner />} />
                <Route path='/kids' element={
                  <>
                    <CarousalFilter category="kids" />
                    <Products category="kids" />
                  </>
                } />
                <Route path='/men' element={
                  <>
                    <CarousalFilter category="men" />
                    <Products category="men" />
                  </>
                } />
                <Route path='/women' element={
                  <>
                    <CarousalFilter category="women" />
                    <Products category="women" />
                  </>
                } />
                <Route path='/productcard' element={<ProductCard />} />
                <Route path='/product/:id' element={<ProductInformation />} />
                <Route path='/*' element={<AdminDashboard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/cart' element={<Cart />}  />
                 <Route path = '/order' element = {<Order/>}/>
             
              </Routes>
              <Fotter />
            </Router>
          </CartProvider>
        </CBProvider>
      </ProductProvider>
      
    </div>
  );
}

export default App;
