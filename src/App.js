import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import ProductScreen from './Component/ProductScreen/ProductScreen';
import AboutUs from './Component/AboutUs/AboutUs';
import Home from './Component/Home/Home';
import { CartProvider } from './Component/Cart/CartContext';
import Layout from './Component/Layout/Layout';
import ContactUs from './Component/ContactUs';
import ProductDetails from './Component/ProductScreen/ProductDetails';


  const productsArr = [
    {
      title: 'Album 1',
      price: 12.99,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 4,
    },
    {
      title: 'Album 2',
      price: 14.99,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 5,
    },
    {
      title: 'Album 3',
      price: 9.99,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 6,
    },
    {
      title: 'Album 4',
      price: 19.99,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
      quantity: 4,
    },
  ];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/store" element={<ProductScreen />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/product/:id" element={<ProductDetails productsArr={productsArr}/>} />
              
              </Routes>
             
           
            </Layout>
          </Router>
        </CartProvider>
      </header>
    </div>
  );
}
export default App;