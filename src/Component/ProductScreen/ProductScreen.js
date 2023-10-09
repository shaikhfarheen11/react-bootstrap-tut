import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import  './ProductScreen.css';
import Cart from '../Cart/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../Cart/CartContext';
import { Link, useLocation } from 'react-router-dom';

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

const ProductScreen = () => {
  const location = useLocation();
  const { cartElements, addToCart, setCartElements, removeFromCart } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isStorePage = location.pathname === '/store';

  const toggleCartPreview = () => {
    setCartOpen(!isCartOpen);
  };
  const selectProduct = (product) => {
    setSelectedProduct(product); 
  };

  const closeProductInfo = () => {
    setSelectedProduct(null); 
  };

  return (
    <Container className="my-5">
      <Navbar variant="dark" expand="lg" className="mb-4" fixed="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home">HOME</Nav.Link>
            <Nav.Link as={Link} to="/store">STORE</Nav.Link>
            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
            <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isStorePage ? (
          <div className="cart-badge" onClick={toggleCartPreview}>
            <AiOutlineShoppingCart size={29} />
            <span className="cart-badge-text">Cart {cartElements.length}</span>
            {isCartOpen && (
              <div className="cart-preview">
                {cartElements.map((item, index) => (
                  <div key={index} className="cart-preview-item">
                    {item.title} - {item.quantity}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </Navbar>
      {isStorePage && (
        <div>
          <h1 className="mb-4 music-title">MUSIC</h1>
          <div className="products">
            {productsArr.map((product, index) => (
              <div key={index} className="mb-4">
                <div className="card border-0">
                  <h6 className={`card-subtitle mb-2 product-title`}
                  onClick={() => selectProduct(product)} 
                  >
                    {product.title}
                    <Link to={`/product/${index}`}>{product.title}</Link> 
                  </h6>


                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="card-img-top smaller-image"
                  />
                  <div className="card-body d-flex justify-content-between align-items-end">
                    <p className="card-text">${product.price}</p>
                    <Button
                      className="custom-add-to-cart-button"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button
              style={{
                backgroundColor: 'grey',
                color: 'rgb(109, 197, 231)',
                padding: '0.8rem',
                fontWeight: '800',
                fontSize: '1.2rem',
                width: '150px',
              }}
              onClick={toggleCartPreview}
            >
              See the Cart
            </Button>
          </div>
        </div>
      )}
      {selectedProduct && (
        <div className="product-info-modal">
          <div className="product-info-content">
            <button className="close-button" onClick={closeProductInfo}>
              &times;
            </button>
            <h2>{selectedProduct.title}</h2>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} />
         
          </div>
        </div>
      )}
      <Cart
        isOpen={isCartOpen}
        toggleCart={toggleCartPreview}
        cartItems={cartElements}
        removeFromCart={removeFromCart}
        setCartItems={setCartElements}
      />
    </Container>
  );
};

export default ProductScreen;
