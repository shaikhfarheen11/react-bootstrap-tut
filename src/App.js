import React from 'react';
import { CartProvider } from './Component/Cart/CartContext';
import Product from './Component/Product/Product'; // Update the path

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Product />
      </div>
    </CartProvider>
  );
}

export default App;