import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { AuthContextProvider } from './Component/AuthContext/AuthContext';
import { CartProvider } from './Component/Cart/CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthContextProvider>
);
