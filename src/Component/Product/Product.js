import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import classes from './Product.module.css';
import { useCart } from '../Cart/CartContext';

const CartBadge = ({ cartItems, onClose, onPlaceOrder }) => {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-badge-overlay">
      <div className="cart-badge-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h3>Cart</h3>
        <p style={{ color: 'black', fontSize: '1.4rem', fontWeight: 'bold' }}>Total Quantity: {totalQuantity}</p>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p style={{ color: 'black',fontSize: '1.4rem'}}>
                {item.shoeName} - {item.description} - {item.price} - Size: {item.size} - Quantity: {item.quantity}
              </p>
            </li>
          ))}
        </ul>
        <p style={{ color: 'black', fontSize: '1.6rem', fontWeight: 'bold' }}>Total Amount: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
        <button className="place-order-button" onClick={onPlaceOrder}>
          Place Order
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const Home = () => <h1>Welcome to the Home Page</h1>;

const Shoes = () => {
  const [enteredShoesName, setEnteredShoesName] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredChoosePrice, setEnteredChoosePrice] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  
  const { cartItems } = useCart();

  const totalQuantity = addedProducts.reduce((total, item) => total + item.quantity, 0);

  const handlePlaceOrder = async () => {
    const response = await fetch('https://crudcrud.com/api/f09256b08ece41e0a4e8e5b5359ddacb/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products: addedProducts }),
    });

    if (response.ok) {
      console.log('Order placed successfully');
      setAddedProducts([]);
      setCartTotal(0);
      setIsCartOpen(false);
    } else {
      console.error('Error placing order');
    }
  };
  const handleShoesName = (event) => {
    setEnteredShoesName(event.target.value);
  };

  const handleChoosePrice = (event) => {
    setEnteredChoosePrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      shoeName: enteredShoesName,
      description: enteredDescription,
      price: parseFloat(enteredChoosePrice),
      quantity: 1,
    };
    setAddedProducts([...addedProducts, newProduct]);
  };

  useEffect(() => {
    if (enteredShoesName === 'Gucci') {
      setEnteredDescription('100% cotton');
      setEnteredChoosePrice('100000');
    } else if (enteredShoesName === 'Sparx') {
      setEnteredDescription('100% cotton');
      setEnteredChoosePrice('50000');
    } else if (enteredShoesName === 'Adidas') {
      setEnteredDescription('Cotton and Feather');
      setEnteredChoosePrice('20000');
    } else if (enteredShoesName === 'Mochi') {
      setEnteredDescription('branded fabric');
      setEnteredChoosePrice('10000');
    }
  }, [enteredShoesName]);

  const shoeNames = ['Gucci', 'Sparx', 'Adidas', 'Mochi'];

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSizeL = () => {
    updateProductQuantity('Large');
  };

  const handleSizeM = () => {
    updateProductQuantity('Medium');
  };

  const handleSizeS = () => {
    updateProductQuantity('Small');
  };

  const updateProductQuantity = (size) => {
    const lastProductIndex = addedProducts.length - 1;

    if (lastProductIndex >= 0) {
      const lastProduct = addedProducts[lastProductIndex];

      if (lastProduct.size === size) {
        lastProduct.quantity += 1;
        setCartTotal(cartTotal + parseFloat(enteredChoosePrice));
        setAddedProducts([...addedProducts.slice(0, lastProductIndex), lastProduct]);
      } else {
        const newProduct = {
          shoeName: enteredShoesName,
          description: enteredDescription,
          price: parseFloat(enteredChoosePrice),
          size: size,
          quantity: 1,
        };
        setCartTotal(cartTotal + parseFloat(enteredChoosePrice));
        setAddedProducts([newProduct]);
        setSelectedSize(size);
      }
    }
  };

  return (
    <Router>
      <div className={classes['seller-admin']}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shoes">Shoes</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shoes" element={<ShoesComponent />} />
        </Routes>
      </div>
    </Router>
  );

  function ShoesComponent() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className={classes['product-control']}>
            <label htmlFor="shoename">Name:</label>
            <select
              id="shoename"
              value={enteredShoesName}
              onChange={handleShoesName}
              className={classes['input-field']}
            >
              <option value="">Select Shoes</option>
              {shoeNames.map((shoe, index) => (
                <option key={index} value={shoe}>
                  {shoe}
                </option>
              ))}
            </select>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={enteredDescription}
              readOnly
              className={classes['input-field']}
            />
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="chooseprice"
              value={enteredChoosePrice}
              onChange={handleChoosePrice}
              className={classes['input-field']}
            />
          </div>

          <button className={classes['submit-button']} type="submit">
            Add Product
          </button>
        </form>

        <button style={{ fontSize: '1.2rem' }} className="size-button" onClick={handleSizeL}>
        Size L
      </button>
      <button style={{ fontSize: '1.2rem' }} className="size-button" onClick={handleSizeM}>
        Size M
      </button>
      <button style={{ fontSize: '1.2rem' }} className="size-button" onClick={handleSizeS}>
        Size S
      </button>

        <button className={classes['cart-badge']} onClick={handleCartClick}>
          Cart: {selectedSize ? addedProducts.filter((product) => product.size === selectedSize)[0]?.quantity || 0 : totalQuantity}
        </button>

        {isCartOpen && <CartBadge cartItems={addedProducts} onClose={handleCartClick} onPlaceOrder={handlePlaceOrder} />}
      </div>
    );
  }
};

export default Shoes;
