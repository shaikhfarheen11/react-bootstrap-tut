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
             
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </header>
    </div>
  );
}
export default App;