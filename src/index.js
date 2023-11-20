import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { AuthContextProvider } from './Component/AuthContext/AuthContext';
import { CartProvider } from './Component/Cart/CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css'; 



ReactDOM.render(
  <AuthContextProvider>
    <CartProvider>
    <App />
    </CartProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);